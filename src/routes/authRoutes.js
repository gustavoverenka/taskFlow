const express = require('express')
const router = express.Router()
const { cadastrar, verificarEmail, login, reenviarCodigo,esqueciSenha, redefinirSenha } = require('../controllers/authController')

router.post('/cadastro', cadastrar)
router.post('/verificar', verificarEmail)
router.post('/login', login)
router.post('/reenviar-codigo', reenviarCodigo)
router.post('/esqueci-senha', esqueciSenha)
router.post('/redefinir-senha', redefinirSenha)

module.exports = router
