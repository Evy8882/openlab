import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import Usuario from '../models/usuario.model.ts'

export async function LoginUsuario(req: any, res: any) {
  try {
    const { email, senha } = req.body

    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
      return res.status(400).json({ erro: 'Usuário ou senha inválidos' })
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha || "")

    if (!senhaValida) {
      return res.status(400).json({ erro: 'Usuário ou senha inválidos' })
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET as string, { expiresIn: '8h' })

    res.json({ mensagem: 'Login realizado com sucesso', token, data: {"nome": usuario.nome, "email": usuario.email} })

  } catch (err) {
    console.log(err)
    res.status(500).json({ erro: 'Erro no servidor' })
  }
}