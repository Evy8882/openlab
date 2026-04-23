import Usuario from "../models/usuario.model.js"
import bcrypt from "bcryptjs"

export async function CadastrarUsuario(req: any, res: any) {
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
}