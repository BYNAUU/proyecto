<template>
  <section>
    <h2>Bienvenido de nuevo, {{ user }}</h2>

    <button @click="mostrarCrear">Crear Receta</button>
    <button @click="mostrarEditar">Editar Receta</button>

    <form v-if="mostrarFormulario == 'crear'" @submit.prevent="crearReceta">


      <h3>Crear Receta</h3>
      <input type="text" v-model="nuevaReceta.nombre" placeholder="Nombre receta">
      <input type="text" v-model="nuevaReceta.foto" placeholder="URL de foto">
      <input type="text" v-model="nuevaReceta.tipo" placeholder="Categoria de receta">
      <textarea v-model="nuevaReceta.descripcion" placeholder="Descripción de la receta"></textarea>

      <div v-for="(paso, index) in nuevaReceta.pasos" :key="index">
        <input type="text" v-model="nuevaReceta.pasos[index]" placeholder="Paso">
        <button type="button" @click="deletePaso(index)">Eliminar paso</button>
      </div>

      <button type="button" @click="agregarPaso">Añadir paso</button>
      <button type="submit">Crear Receta</button>


    </form>

    <form v-if="mostrarFormulario =='editar'" @submit.prevent="editarReceta">
      <h3>Editar Receta</h3>
    </form>
  </section>
</template>




<script>
import Cookies from 'js-cookie'
import axios from 'axios'

export default {
  data() {
    return {
      user: Cookies.get("user") || "", 
      mostrarFormulario: "",
      nuevaReceta: {
        nombre: "",
        foto: "",
        tipo: "",
        descripcion: "",
        pasos: [""],
        like: 0
      }
    }
  },
  methods: {
    mostrarCrear() {
      this.mostrarFormulario = "crear"
    },

    mostrarEditar() {
      this.mostrarFormulario = "editar"
    },

    async crearReceta() {

      try {
        const response = await axios.post("http://localhost:3000/add",{...this.nuevaReceta,action: "create"})

        if (response.data.success) {
          console.log("Receta creada perfectamente")
          this.nuevaReceta = { nombre: "", foto: "", tipo: "", descripcion: "", pasos: [""], like: 0 }
        } else {

          console.log("Ha habido un error")

        }
      } catch (error) {

        console.error(error)
        

      }
    },




   
    agregarPaso() {
      this.nuevaReceta.pasos.push("")
    },

    deletePaso(index) {
      this.nuevaReceta.pasos.splice(index, 1)
    }

  },


  mounted() {
    //si no existe la cookie a la hora de entrar a la interfaz te redirecciona a /identificarte
    if (!Cookies.get("user")) {
      this.$router.push("/identificarse")
    }
  }
}
</script>
