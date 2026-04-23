import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Usuario from './models/usuario.js'

const app = express()
app.use(express.json())

// 🔗 Conexão com MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/meubanco')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err))

// 📌 Rota de cadastro
app.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body

    // Verifica se já existe
    const existe = await Usuario.findOne({ email })
    if (existe) {
      return res.status(400).json({ erro: 'Email já cadastrado' })
    }

    // Criptografa senha
    const senhaHash = await bcrypt.hash(senha, 10)

    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaHash
    })

    await novoUsuario.save()

    res.json({ mensagem: 'Usuário cadastrado com sucesso' })

  } catch (err) {
    res.status(500).json({ erro: 'Erro no servidor' })
  }
})

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