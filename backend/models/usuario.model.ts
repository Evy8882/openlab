import mongoose from "mongoose"

const UsuarioSchema = new mongoose.Schema({
    nome: String,
    email: {type: String, unique: true},
    senha: String,
    tipo: {type: String, enum: ['aluno', 'monitor'], default: 'aluno'},
    criadoEm: {type:Date, default: Date.now}

})

export default mongoose.model('User', UsuarioSchema)