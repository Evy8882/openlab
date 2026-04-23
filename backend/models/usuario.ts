const mongoose = require("mongoose")

const UsuarioSchema = new mongoose.Schema({
    nome: String,
    email: {Type: String, unique: true},
    senha: String,
    criadoEm: {type:Date, default: Date.now}

})

export default mongoose.model('usuario', UsuarioSchema)