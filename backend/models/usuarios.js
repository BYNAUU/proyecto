const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
})

module.exports = mongoose.model('Usuario', usuarioSchema, 'usuarios')
