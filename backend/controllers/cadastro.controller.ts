import Usuario from "../models/usuario.model.ts"
import bcrypt from "bcryptjs"

export async function CadastrarUsuario(req: any, res: any) {
    try {
        const { nome, email, senha, tipo, codigo } = req.body
    
        // Verifica se já existe
        const existe = await Usuario.findOne({ email })
        if (existe) {
          return res.status(400).json({ erro: 'Email já cadastrado' })
        }

        if (tipo === "monitor") {
          // Código provisório -> Alterar automáticamente semanalmente quando em produção
          if (codigo !== "MONITOR2026") {
            return res.status(400).json({ erro: 'Código de monitor inválido' })
          }
        }
    
        // Criptografa senha
        const senhaHash = await bcrypt.hash(senha, 10)
    
        const novoUsuario = new Usuario({
          nome,
          email,
          senha: senhaHash,
          tipo
        })
    
        await novoUsuario.save()
    
        res.json({ mensagem: 'Usuário cadastrado com sucesso' })
    
      } catch (err) {
        res.status(500).json({ erro: 'Erro no servidor' })
      }
}