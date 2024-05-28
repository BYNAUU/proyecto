const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  usuario: String,
  correo: String,
  contrasena: String,
  favs: []
})

module.exports = mongoose.model('Usuario', usuarioSchema, 'usuarios')


