const jwt = require('jsonwebtoken')

function verificarToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ mensagem: 'Token não fornecido!' })
    }

    try {
        const dados = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = dados
        next()
    } catch {
        return res.status(401).json({ mensagem: 'Token inválido!' })
    }
}

module.exports = verificarToken
