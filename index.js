require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoutes = require('./src/routes/authRoutes')
const tarefaRoutes = require('./src/routes/tarefaRoutes')
const helmet = require('helmet')
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não definido no .env')
}

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ mensagem: 'API Project Final funcionando!' })
})

app.use('/auth', authRoutes)
app.use('/tarefas', tarefaRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
