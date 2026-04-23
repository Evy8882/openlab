import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import { CadastrarUsuario } from './controllers/cadastro.controller.ts'

const app = express()
app.use(cors())
app.use(express.json())

// Conexão com MongoDB
// console.log("URI: " + process.env.MONGO_URI)

async function conectarDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI não definida")
    }

    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB conectado")

  } catch (err) {
    console.error("Erro ao conectar:", err)
    process.exit(1)
  }
}

conectarDB()

app.get('/', (req: any, res: any) => {
  res.json({ mensagem: 'Teste realizado com sucesso' })
})

// Rota de cadastro
app.post('/cadastro', CadastrarUsuario)

// Rota de login
app.post('/login', async (req: any, res: any) => {
})

// ▶️ Inicia servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})