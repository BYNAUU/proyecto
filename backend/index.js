const express = require('express') 
const mongoose = require('mongoose') 
const cors = require('cors')  // Importa el paquete cors
const Usuario = require('./models/usuarios') //Importo el modelo de la base de datos de usuarios
const Receta = require('./models/recetas')//Importo el modelo de la base de datos de recetas

const app = express() 

//Middleware de CORS para el acceso del frontend con el backend
app.use(cors()) 

// me conecto con la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/tfg') 



//busca todas las recetas de cada categoria
app.get('/recipes/:nombre', async (req, res) => {
  const nombreCategoria = req.params.nombre 
  try {
    const recetas = await Receta.find({tipo:nombreCategoria }) 
    res.json(recetas) 
  } catch (error) {
    console.error(error) 
    res.status(500).json({ mensaje: 'Error del servidor' }) 
  }
}) 

//Encuentro el tipo de receta por el id
app.get('/recipes/:nombre/:id', async (req, res) => {
  const id = req.params.id

  try {
    const encontrado = await Receta.findById(id) 
    res.json(encontrado) 
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' }) 
  }
}) 






const PORT = process.env.PORT || 3000 
app.listen(PORT, () => {
  console.log(`Server backend escuchando en el puerto ${PORT}`) 
}) 
