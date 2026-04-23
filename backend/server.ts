import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Usuario from './models/usuario.model.js'

import { CadastrarUsuario } from './controllers/cadastro.controller.js'

const app = express()
app.use(express.json())

// 🔗 Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI || "")
  .then(() => console.log('MongoDB conectado'))
  .catch(err => {
    console.log(err)
    process.exit(1)
  })

// 📌 Rota de cadastro
app.post('/cadastro', CadastrarUsuario)

// 🔐 Rota de login
app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body

    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
      return res.status(400).json({ erro: 'Usuário não encontrado' })
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha)

    if (!senhaValida) {
      return res.status(400).json({ erro: 'Senha incorreta' })
    }

    res.json({ mensagem: 'Login realizado com sucesso' })

  } catch (err) {
    res.status(500).json({ erro: 'Erro no servidor' })
  }
})

// ▶️ Inicia servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})