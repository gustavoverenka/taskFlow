const jwt = require('jsonwebtoken')

function verificarToken(req, res, next) {
    const authorization = req.headers.authorization
    const match = typeof authorization === 'string' && /^Bearer ([^\s]+)$/.exec(authorization)

    if (!match) {
        return res.status(401).json({ mensagem: 'Token não fornecido!' })
    }

    try {
        const dados = jwt.verify(match[1], process.env.JWT_SECRET)
        req.usuario = dados
        next()
    } catch {
        return res.status(401).json({ mensagem: 'Token inválido!' })
    }
}

module.exports = verificarToken
