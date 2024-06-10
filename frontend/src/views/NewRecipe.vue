<template>
  <section class="principal">
    <div class="principal__header">
      <h2>Bienvenido de nuevo, {{ user }}</h2>

      <div class="principal__header__contbotones">
        <button @click="mostrarCrear">Crear Receta</button>
        <button @click="mostrarEditar">Editar Receta</button>
      </div>
    </div>

    <form class="principal__formcrear"  v-if="mostrarFormulario === 'crear'" @submit.prevent="crearReceta">
      <h3>Rellene para crear</h3>
      <section class="principal__formcrear__continput" >
        <input required type="text" v-model="nuevaReceta.nombre" placeholder="Nombre receta">
        <input required type="text" v-model="nuevaReceta.foto" placeholder="URL de foto">
        <input required type="text" v-model="nuevaReceta.tipo" placeholder="Categoría de receta">
      </section>
      
      <textarea v-model="nuevaReceta.descripcion" placeholder="Descripción de la receta"></textarea>
      <div class="principal__formcrear__pasos">
        <div  class="principal__formcrear__pasos__inputs" v-for="(paso, index) in nuevaReceta.pasos" :key="index">
          <input required type="text" v-model="nuevaReceta.pasos[index]" placeholder="Paso">
          <svg @click="deletePaso(index)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#000000" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
          
        </div>
      </div>
      <section  class="principal__formcrear__contbotoness">
        <button   type="button" @click="agregarPaso">Añadir paso</button>
        <button  type="submit">Crear Receta</button>
      </section>
      
    </form>





    <form class="principal__formcrear" v-if="mostrarFormulario === 'editar'" @submit.prevent="editarReceta">
      <h3>Seleccione para editar</h3>
      <select v-model="recetaSeleccionada" @change="cargarReceta">
        <option v-for="receta in recetas" :key="receta._id" :value="receta">{{ receta.nombre }}</option>
      </select>

      <div class="receta_seleccionada" v-if="recetaSeleccionada">
        <section class="principal__formcrear__continput" >
          <input required type="text" v-model="recetaSeleccionada.nombre" placeholder="Nombre receta">
          <input required type="text" v-model="recetaSeleccionada.foto" placeholder="URL de foto">
          <input required type="text" v-model="recetaSeleccionada.tipo" placeholder="Categoría de receta">
        </section>
        
        <textarea v-model="recetaSeleccionada.descripcion" placeholder="Descripción de la receta"></textarea>

        <div class="principal__formcrear__pasos">
          <div class="principal__formcrear__pasos__inputs" v-for="(paso, index) in recetaSeleccionada.pasos" :key="index">
            <input required type="text" v-model="recetaSeleccionada.pasos[index]" placeholder="Paso">
            <svg @click="deletePasoEdicion(index)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#000000" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
          </div>
        </div>
        
        <section  class="principal__formcrear__contbotoness">
          <button  v-if="recetaSeleccionada.pasos.length < 7" type="button" @click="agregarPasoEdicion">Añadir paso</button>
          <button type="submit">Guardar Cambios</button>
        </section>

        </div>
    </form>




  </section>
</template>

<script>
import Cookies from 'js-cookie'
import axios from 'axios'
import {useToast} from "vue-toastification"

export default {
  data() {
    return {
      user: Cookies.get("user") || "",
      mostrarFormulario: "crear",
      nuevaReceta: {
        nombre: "",
        foto: "",
        tipo: "",
        descripcion: "",
        pasos: [""],
        creado: Cookies.get("user")
      },
      recetas: [],
      recetaSeleccionada: null,
      toast:useToast()
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
        const response = await axios.post("http://localhost:3000/receta", {...this.nuevaReceta, action: "create"})

        if (response.data.success) {
          console.log("Receta creada perfectamente")
          this.nuevaReceta = { nombre: "", foto: "", tipo: "", descripcion: "", pasos: [""], creado: Cookies.get("user") }
          this.obtenerRecetas()
          this.toast.success("Receta creada exitosamente", {
                        position: "top-right",timeout: 5000,closeOnClick: true,pauseOnFocusLoss: true,pauseOnHover: true,draggable: true,draggablePercent: 0.6,showCloseButtonOnHover: false,hideProgressBar: true,closeButton: "button",icon: true,rtl: false
          })
          this.$router.push("/recipes")
        } else {
          console.log("Ha habido un error")
          this.toast.error("Receta no se ha podido modificar", {
            position: "top-right",timeout: 5000,closeOnClick: true,pauseOnFocusLoss: true,pauseOnHover: true,draggable: true,draggablePercent: 0.6,showCloseButtonOnHover: false,hideProgressBar: true,closeButton: "button",icon: true,rtl: false
          })
        }
      } catch (error) {
        console.error(error)
        this.$router.push("/error")
      }
    },
    async obtenerRecetas() {
      try {
        const respuesta = await axios.get("http://localhost:3000/profile", {
          params: { cookie: Cookies.get("user") }
        })
        this.recetas = respuesta.data.recetas
      } catch (error) {
        console.error(error)
        this.$router.push("/error")
      }
    },
    async editarReceta() {
      try {
        console.log(this.recetaSeleccionada)
        const response = await axios.post("http://localhost:3000/receta", {...this.recetaSeleccionada, action: "edit"})

        if (response.data.success) {
          console.log("Receta actualizada correctamente")
          this.obtenerRecetas()
          this.toast.success("Receta modificada exitosamente", {
                        position: "top-right",timeout: 5000,closeOnClick: true,pauseOnFocusLoss: true,pauseOnHover: true,draggable: true,draggablePercent: 0.6,showCloseButtonOnHover: false,hideProgressBar: true,closeButton: "button",icon: true,rtl: false
          })
          this.$router.push("/recipes")
        } else {
          console.log("Ha habido un error")
          this.toast.error("Receta no se ha podido modificar", {
                        position: "top-right",timeout: 5000,closeOnClick: true,pauseOnFocusLoss: true,pauseOnHover: true,draggable: true,draggablePercent: 0.6,showCloseButtonOnHover: false,hideProgressBar: true,closeButton: "button",icon: true,rtl: false
          })
        }
      } catch (error) {
        console.error(error)
        this.$router.push("/error")
      }
    },
    agregarPaso() {
      this.nuevaReceta.pasos.push("")
    },
    deletePaso(index) {
      this.nuevaReceta.pasos.splice(index, 1)
    },
    agregarPasoEdicion() {
      this.recetaSeleccionada.pasos.push("")
    },
    deletePasoEdicion(index) {
      this.recetaSeleccionada.pasos.splice(index, 1)
    },
    cargarReceta() {
      console.log(this.recetaSeleccionada)
    }
  },
  mounted() {
    if (!Cookies.get("user")) {
      this.$router.push("/identificarse")
    } else {
      this.obtenerRecetas()
    }
  }
}
</script>

<style scoped lang="sass">
  *
    margin: 0
    padding: 0
    font-family: roboto
  .principal
    display: flex
    align-items: center
    flex-direction: column
    width: 100%
    height: 100vh
    background: #8F81BE
    &__header
      height: 15%
      width: 100%
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      h2
        font-size: 30px
        margin-bottom: 10px
        color: white
      &__contbotones
        width: 20%
        display: flex
        justify-content: space-between
        @media (max-width: 430px)
          width: 100%
          justify-content: space-around
        
        button
          width: 160px
          height: 40px
          font-size: 16px
          font-weight: bold
          border: none
          border-radius: 10px
          cursor: pointer
          @media (max-width: 430px)
            width: 40%
          
    &__formcrear
      background: #f0f0f0
      width: 60%
      height: 82%
      display: flex
      align-items: center
      flex-direction: column
      border-radius: 10px
      @media (max-width: 430px)
        width: 90%
      select
        width: 90%
        height: 40px
        margin-bottom: 30px
      .receta_seleccionada
        width: 100%
        height: 100%
        display: flex
        align-items: center
        flex-direction: column
      h3
        font-size: 30px
        margin: 30px 0
      &__continput
        width: 90%
        display: flex
        justify-content: space-between
        margin: 10px 0
        @media (max-width: 930px)
          width: 90%
          display: flex
          flex-direction: column
        input
          border: 2px solid black
          width: 300px
          height: 40px
          padding-left: 5px
          margin-bottom: 10px
          border-radius: 10px
          @media (max-width: 930px)
            width: 100%
      
      textarea
        width: 88%
        padding: 10px
        height: 15%
        border: 2px solid black
        border-radius: 10px
        resize: none
        @media (max-width: 430px)
          width: 89%
          margin-left: 7px
          padding-left: 5px
      &__pasos
        width: 90%
        height: 45%
        margin: 20px 0
        overflow-y: scroll
        scrollbar-color:   black #f0f0f0
        scrollbar-width: thin
        &__inputs
          display: flex
          align-items: center

          input
            border: 2px solid black
            width: 95%
            height: 40px
            padding-left: 5px
            margin-bottom: 10px
            border-radius: 10px
          svg
            width: 23px
            height: 23px
            margin-left: 10px
            margin-bottom: 10px
            cursor: pointer
      &__contbotoness
        width: 20%
        display: flex
        justify-content: space-between
        justify-content: center
        @media (max-width: 430px)
          width: 100%
          justify-content: space-around
          margin-bottom: 20px
        button
          background: #8F81BE
          width: 160px
          height: 40px
          font-size: 16px
          font-weight: bold
          border: none
          border-radius: 10px
          cursor: pointer
          color: white
          margin: 0 10px
          @media (max-width: 430px)
            width: 40%



</style>
    