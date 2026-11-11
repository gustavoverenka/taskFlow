const { test } = require('node:test')
const assert = require('node:assert/strict')

// As validações devem ocorrer antes de qualquer acesso ao banco.
const prismaPath = require.resolve('@prisma/client')
require.cache[prismaPath] = { id: prismaPath, filename: prismaPath, loaded: true, exports: {
    PrismaClient: class {
        constructor() {
            this.tarefa = new Proxy({}, { get() { throw new Error('Banco não deve ser acessado') } })
        }
    }
} }
const tarefas = require('../src/controllers/tarefaController')

function resposta() {
    return { status(code) { this.code = code; return this }, json(body) { this.body = body; return this } }
}

test('criação exige título e rejeita prioridade inválida', async () => {
    for (const body of [{}, { titulo: '' }, { titulo: 'Tarefa', prioridade: 'URGENTE' }]) {
        const res = resposta()
        await tarefas.criar({ body, usuario: { id: 1 } }, res)
        assert.equal(res.code, 400)
    }
})

test('listagem e atualização rejeitam prioridade inválida', async () => {
    for (const [fn, req] of [
        [tarefas.listar, { query: { prioridade: 'URGENTE' }, usuario: { id: 1 } }],
        [tarefas.atualizar, { body: { prioridade: 'URGENTE' }, params: { id: '1' }, usuario: { id: 1 } }]
    ]) {
        const res = resposta()
        await fn(req, res)
        assert.equal(res.code, 400)
    }
})
