const express = require('express') 
const mongoose = require('mongoose') 
const bodyParser = require('body-parser')
const cors = require('cors')  // Importa el paquete cors
const bcrypt = require('bcrypt')
const Usuario = require('./models/usuarios') //Importo el modelo de la base de datos de usuarios
const Receta = require('./models/recetas')//Importo el modelo de la base de datos de recetas

const app = express() 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Middleware de CORS para el acceso del frontend con el backend
app.use(cors()) 

// me conecto con la base de datos
mongoose.connect('mongodb+srv://byNAU:befKc6leh5yLGKJ9@cluster0.w1vmvw2.mongodb.net/tfg?retryWrites=true&w=majority&appName=Cluster0') 



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

// entra en el login y el register y depende del action si es login o register hace una cosa u otra
app.post('/identificarse',async(req,res)=>{
  const { usuario,correo,contrasena,action }=req.body

  if(action=== 'login'){
    try{
      const user=await Usuario.findOne({ usuario,correo })
      if(user){
        const isMatch=await bcrypt.compare(contrasena,user.contrasena)
        if(isMatch){
          res.json({ success:true,user })
        }else{
          res.json({ success:false,message:'Datos incorrectos' })
        }
      }else{
        res.json({ success:false,message:'Usuario no encontrado' })
      }
    }catch(error){

      res.status(500).json({ success:false,message: error })

    }
  }else if(action=== 'register'){
    try{

      const existingUser= await Usuario.findOne({ usuario })
      const existingMail= await Usuario.findOne({ correo })

      if(existingUser || existingMail ){

        return res.json({ success:false,message:'Este usuario ya ha sido creado' })
      }

      const hashedPassword=await bcrypt.hash(contrasena,10)
      const newUser=new Usuario({ usuario,correo,contrasena:hashedPassword })
      await newUser.save()
      res.json({ success:true,user:newUser })

    }catch(error){

      res.status(500).json({success:false,message:'Error en el server',error })
    }
  }else{

    res.status(400).json({ success:false,message: error })
  }
})

//Crea o Modifica receta
app.post('/receta', async (req, res) => {
  const { action, ...recetaData } = req.body

  if (action === "create") {
    try {
      const nuevaReceta = new Receta(recetaData)
      await nuevaReceta.save()
      res.json({ success: true, message: "Receta creada" })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message:"Error al crear" })
    }



  } if (action === "edit") {
    try {
      const { nombre, ...updateData } = recetaData
      const recetaActualizada = await Receta.findOneAndUpdate({ nombre:nombre }, updateData, { new: true })


      if (!recetaActualizada) {
        return res.status(404).json({ success: false, message: "Receta no encontrada" })


      }
      res.json({ success: true, message: "Receta editada exitosamente", receta: recetaActualizada })

      
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message:"Error al editar la receta" })
    }
  } else {
    res.status(400).json({ success: false, message:"Acción no válida" })
  }
})

//Encuentra una receta donde el usuario se llame igual que el valor de la cookie
app.get('/profile', async (req, res) => {
  const cookie = req.query.cookie
  try {
    const recetas = await Receta.find({ creado: cookie })
    res.json({ success: true, recetas })
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje:'Error del server' })
  }
})

//Elimina el usuario
app.post('/delete', async (req, res) => {
  const cookie = req.body.cookie
  try {
    const recetas = await Usuario.deleteOne({ usuario: cookie })
    res.json({ success: true, recetas })
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje:'Error del server' })
  }
})













const PORT = process.env.PORT || 3000 
app.listen(PORT, () => {
  console.log(`Server backend escuchando en el puerto ${PORT}`) 
}) 
