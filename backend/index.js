const express = require('express') 
const mongoose = require('mongoose') 
const bodyParser = require('body-parser')
const cors = require('cors')  // Importa el paquete cors
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const Usuario = require('./models/usuarios') //Importo el modelo de la base de datos de usuarios
const Receta = require('./models/recetas')//Importo el modelo de la base de datos de recetas

const app = express() 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Middleware de CORS para el acceso del frontend con el backend
app.use(cors()) 

// me conecto con la base de datos
mongoose.connect('mongodb+srv://byNAU:befKc6leh5yLGKJ9@cluster0.w1vmvw2.mongodb.net/tfg?retryWrites=true&w=majority&appName=Cluster0') 


const SECRET = 'gatito'


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
  }else if (action === "psswd") {
    try {
      const usuario = await Usuario.findOne({ correo })
      console.log(usuario)

      if (!usuario) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
      }

      const token = jwt.sign({ correo: usuario.correo }, SECRET, { expiresIn: '1h' }) 


      // Config claves
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'deliceocompany@gmail.com',
          pass: 'wpgn zgrl cnpt okqm'
        }
      }) 

      //Cuerpo del correo
      const mailOptions = {
        from: 'deliceocompany@gmail.com',
        to: usuario.correo,
        subject: 'Recuperación de Contraseña',
        text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: http://localhost:8080/reset/${token}`
      }

      // Enviar el correo
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ success: false, message: 'Error al enviar el correo' })
        }
        res.status(200).json({ success: true, message: 'Correo de recuperación enviado' })
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: 'Ha ocurrido un error' })
    }
  } else {
    res.status(400).json({ success: false, message: 'Acción no válida' })
  }
})

app.post('/reset/:token', async (req, res) => {
  const { token } = req.params.token
  const { nuevaContra } = req.body

  try {
    // Verificar el token JWT
    const decoded = jwt.verify(req.params.token, SECRET)
    console.log('Token decodificado:', decoded)
    const usuario = await Usuario.findOne({ correo: decoded.correo })
    console.log('Usuario encontrado:', usuario)

    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
    }

    const hashedPassword = await bcrypt.hash(nuevaContra, 10)
    usuario.contrasena = hashedPassword
    await usuario.save()

    res.status(200).json({ success: true, message: 'Contraseña restablecida' })
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error)
    res.status(500).json({ success: false, message: 'Ha ocurrido un error' })
  }
})



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
  const { cookie } = req.body
  try {
    const recetas = await Usuario.findOneAndDelete({ usuario: cookie }) 
    res.json({ success: true, recetas }) 
  } catch (error) {
    console.error('Error al eliminar el usuario:', error) 
    res.status(500).json({ mensaje: 'Error del servidor' }) 
  }
})














const PORT = process.env.PORT || 3000 
app.listen(PORT, () => {
  console.log(`Server backend escuchando en el puerto ${PORT}`) 
}) 
