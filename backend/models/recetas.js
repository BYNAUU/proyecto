const mongoose = require('mongoose')

const recetaSchema = new mongoose.Schema({
  nombre: String,
  foto: String,
  tipo: String,
  descripcion: String,
  pasos: [String],
}) 

module.exports = mongoose.model('Receta', recetaSchema, 'recetas') 
