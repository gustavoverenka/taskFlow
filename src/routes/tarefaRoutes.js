const express = require('express')
const router = express.Router()
const verificarToken = require('../middleware/auth')
const { listar, criar, atualizar, completar, deletar } = require('../controllers/tarefaController')

router.get('/', verificarToken, listar)
router.post('/', verificarToken, criar)
router.put('/:id', verificarToken, atualizar)
router.patch('/:id/completar', verificarToken, completar)
router.delete('/:id', verificarToken, deletar)

module.exports = router
