const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const prioridades = ['BAIXA', 'MEDIA', 'ALTA']

const listar = async (req, res) => {
    const { prioridade, concluida } = req.query

    if (prioridade && !prioridades.includes(prioridade)) {
        return res.status(400).json({ mensagem: 'Prioridade invalida!' })
    }

    const filtros = {
        usuarioId: req.usuario.id
    }

    if (prioridade) {
        filtros.prioridade = prioridade
    }

    if (concluida !== undefined) {
        filtros.concluida = concluida === 'true'
    }

    try {
        const tarefas = await prisma.tarefa.findMany({
            where: filtros,
            orderBy: { criadoEm: 'desc' }
        })

        res.json(tarefas)
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro interno' })
    }
}

const criar = async (req, res) => {
    const { titulo, descricao, prioridade, dataLimite } = req.body

    if (!titulo) {
        return res.status(400).json({ mensagem: 'Titulo obrigatorio!' })
    }

    if (prioridade && !prioridades.includes(prioridade)) {
        return res.status(400).json({ mensagem: 'Prioridade invalida!' })
    }

    try {
        const tarefa = await prisma.tarefa.create({
            data: {
                titulo,
                descricao,
                prioridade: prioridade || 'MEDIA',
                dataLimite: dataLimite ? new Date(dataLimite) : null,
                usuarioId: req.usuario.id
            }
        })

        res.status(201).json(tarefa)
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro interno' })
    }
}

const atualizar = async (req, res) => {
    const { titulo, descricao, prioridade, dataLimite } = req.body
    const id = parseInt(req.params.id)

    if (prioridade && !prioridades.includes(prioridade)) {
        return res.status(400).json({ mensagem: 'Prioridade invalida!' })
    }

    try {
        const tarefa = await prisma.tarefa.findUnique({ where: { id } })

        if (!tarefa) {
            return res.status(404).json({ mensagem: 'Tarefa nao encontrada' })
        }
        if (tarefa.usuarioId !== req.usuario.id) {
            return res.status(403).json({ mensagem: 'Sem permissao!' })
        }

        const atualizada = await prisma.tarefa.update({
            where: { id },
            data: {
                titulo,
                descricao,
                prioridade,
                dataLimite: dataLimite ? new Date(dataLimite) : null
            }
        })
        res.json(atualizada)
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro interno' })
    }
}

const completar = async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const tarefa = await prisma.tarefa.findUnique({ where: { id } })

        if (!tarefa) {
            return res.status(404).json({ mensagem: 'Tarefa nao encontrada' })
        }
        if (tarefa.usuarioId !== req.usuario.id) {
            return res.status(403).json({ mensagem: 'Sem permissao!' })
        }

        const atualizada = await prisma.tarefa.update({
            where: { id },
            data: { concluida: true }
        })
        res.json(atualizada)
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro interno' })
    }
}

const deletar = async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const tarefa = await prisma.tarefa.findUnique({ where: { id } })

        if (!tarefa) {
            return res.status(404).json({ mensagem: 'Tarefa nao encontrada' })
        }
        if (tarefa.usuarioId !== req.usuario.id) {
            return res.status(403).json({ mensagem: 'Sem permissao!' })
        }

        await prisma.tarefa.delete({ where: { id } })
        res.json({ mensagem: 'Tarefa deletada com sucesso!' })
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro interno' })
    }
}

module.exports = { listar, criar, atualizar, completar, deletar }
