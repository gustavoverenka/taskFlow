const { test } = require('node:test')
const assert = require('node:assert/strict')
const jwt = require('jsonwebtoken')
const verificarToken = require('../src/middleware/auth')

process.env.JWT_SECRET = 'test-only-secret'

function verificar(authorization) {
    const req = { headers: { authorization } }
    const res = {
        status(code) { this.code = code; return this },
        json(body) { this.body = body; return this }
    }
    let called = false
    verificarToken(req, res, () => { called = true })
    return { req, res, called }
}

test('aceita um Bearer JWT válido e disponibiliza o usuário', () => {
    const token = jwt.sign({ id: 42 }, process.env.JWT_SECRET)
    const result = verificar(`Bearer ${token}`)
    assert.equal(result.called, true)
    assert.equal(result.req.usuario.id, 42)
})

test('rejeita cabeçalhos ausentes ou malformados', () => {
    const token = jwt.sign({ id: 42 }, process.env.JWT_SECRET)
    for (const header of [undefined, '', 'Bearer', 'Bearer ', token, `Basic ${token}`, `bearer ${token}`, `Bearer  ${token}`, `Bearer ${token} extra`, `Bearer ${token} `]) {
        const result = verificar(header)
        assert.equal(result.res.code, 401, String(header))
        assert.equal(result.called, false)
    }
})

test('rejeita JWT inválido, assinado com outra chave ou expirado', () => {
    const tokens = ['invalido', jwt.sign({ id: 42 }, 'outra-chave'), jwt.sign({ id: 42 }, process.env.JWT_SECRET, { expiresIn: -1 })]
    for (const token of tokens) {
        const result = verificar(`Bearer ${token}`)
        assert.equal(result.res.code, 401)
        assert.equal(result.called, false)
    }
})
