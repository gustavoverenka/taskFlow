const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const { enviarCodigoVerificacao, enviarEmailRedefinicao } = require('../services/email')

const prisma = new PrismaClient()

// gera código de 6 dígitos
function gerarCodigo() {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

const cadastrar = async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Campos obrigatórios!' })
    }
    if (senha.length < 6) {
        return res.status(400).json({ mensagem: 'Senha muito curta!' })
    }

    try {
        const hash = await bcrypt.hash(senha, 10)
        const codigo = gerarCodigo()
        const expira = new Date(Date.now() + 10 * 60 * 1000) // 10 minutos

        const usuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: hash,
                codigoVerif: codigo,
                codigoExpira: expira
            }
        })

        await enviarCodigoVerificacao(email, codigo)

        res.status(201).json({
            mensagem: 'Cadastrado! Verifique seu email.',
            id: usuario.id
        })
    } catch (err) {
        res.status(400).json({ mensagem: 'Email já cadastrado!' })
    }
}

const verificarEmail = async (req, res) => {
    const { email, codigo } = req.body

    try {
        const usuario = await prisma.usuario.findUnique({ where: { email } })

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' })
        }
        if (usuario.verificado) {
            return res.status(400).json({ mensagem: 'Email já verificado!' })
        }
        if (usuario.codigoVerif !== codigo) {
            return res.status(400).json({ mensagem: 'Código incorreto!' })
        }
        if (new Date() > usuario.codigoExpira) {
            return res.status(400).json({ mensagem: 'Código expirado!' })
        }

        await prisma.usuario.update({
            where: { email },
            data: {
                verificado: true,
                codigoVerif: null,
                codigoExpira: null
            }
        })

        res.json({ mensagem: 'Email verificado com sucesso!' })
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro interno' })
    }
}
//reenviar código de verificação
const reenviarCodigo = async (req, res) => {
  const { email } = req.body

  if (!email){
    return res.status(400).json({ mensagem: 'Email é obrigatório!' })
  }
  try {
    const usuario = await prisma.usuario.findUnique({ where: { email }})

    if (!usuario){
      return res.status(404).json({ mensagem: 'Usuário não encontrado!' })
    }

    if (usuario.verificado){
      return res.status(400).json({ mensagem: 'Email já verificado!' })
    }

    const codigo = gerarCodigo()
    const expira = new Date(Date.now() + 10 * 60 * 1000) // 10 minutos

    await prisma.usuario.update({
      where: { email },
      data: {
        codigoVerif: codigo,
        codigoExpira: expira
      }
    })

    await enviarCodigoVerificacao(email, codigo)
    res.json({ mensagem: 'Código de verificação reenviado!' })
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao reenviar codigo!' })
  }
}
const login = async (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Campos obrigatórios!' })
    }

    try {
        const usuario = await prisma.usuario.findUnique({ where: { email } })

        if (!usuario) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' })
        }
        if (!usuario.verificado) {
            return res.status(401).json({ mensagem: 'Email não verificado! Cheque sua caixa de entrada.' })
        }

        const isMatch = await bcrypt.compare(senha, usuario.senha)
        if (!isMatch) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' })
        }

        const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.json({ token })
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro interno' })
    }
}
const esqueciSenha = async (req, res) => {
  const {email} = req.body

  if(!email){
    return res.status(400).json({ mensagem: 'Email é obrigatório!' })
  }
  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } })
    if (!usuario){
      return res.status(404).json({ mensagem: 'Usuário não encontrado!' })
    }
    const codigo = gerarCodigo()
    const expira = new Date(Date.now() + 10 * 60 * 1000) // 10 minutos

    await prisma.usuario.update({
      where: { email },
      data: {
        codigoReset: codigo,
        codigoResetExpira: expira
      }
    })

    await enviarEmailRedefinicao(email, codigo)
    res.json({ mensagem: 'Se o email existir, enviaremos um codigo.' })
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao processar solicitação!' })
  }
}
const redefinirSenha = async (req, res) => {
  const { email, codigo, novaSenha } = req.body

  if (!email || !codigo || !novaSenha){
    return res.status(400).json({ mensagem: 'Campos obrigatórios!' })
  }
  if (novaSenha.length < 6){
    return res.status(400).json({ mensagem: 'Senha muito curta!' })
  }
  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } })

    if (!usuario){
      return res.status(404).json({ mensagem: 'Usuário não encontrado!' })
    }
    if (usuario.codigoReset !== codigo){
      return res.status(400).json({ mensagem: 'Código inválido!' })
    }
    if (!usuario.codigoResetExpira || new Date() > usuario.codigoResetExpira){
      return res.status(400).json({ mensagem: 'Código expirado!' })
    }

    const hash = await bcrypt.hash(novaSenha, 10)

    await prisma.usuario.update({
      where: { email },
      data: {
        senha: hash,
        codigoReset: null,
        codigoResetExpira: null
      }
    })
    res.json({ mensagem: 'Senha redefinida com sucesso!' })
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao redefinir senha!' })
  }
}


module.exports = { cadastrar, verificarEmail, reenviarCodigo, login, esqueciSenha, redefinirSenha }
