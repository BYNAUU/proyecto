<template>
    <section class="menu">
        <div class="menu__categoria">
            <a></a>
            <h1>{{ categoria }}</h1>
            <a href="http://localhost:8080/recipes/"><i class="fa-solid fa-arrow-left"></i></a>
            
        </div>
        
        <section class="menu__img">
            <div class="menu__img__conts" v-for="receta in recetas" :key="receta._id" >
                <div class="menu__img__conts__cont" @click="verreceta(receta._id)">
                    <p>{{receta.nombre}}</p>
                </div>
                
            </div>
        </section>
    </section>
</template>

<script>
import axios from 'axios' 

export default {
    data() {
        return {
            recetas: [],
            categoria: '',
        } 
    },
    mounted() {
        this.categoria = this.$route.params.nombre  // Obtener el parámetro de la URL
        console.log(this.categoria)
        console.log(`http://localhost:3000/recipes/${this.categoria}`)
        this.obtenerRecetas() 
        
    },
    methods: {
        async obtenerRecetas() {
            try {
                const respuesta = await axios.get(`http://localhost:3000/recipes/${this.categoria}`) 
                this.recetas = respuesta.data 
                console.log("aa")
            } catch (error) {
                console.error('Error al obtener recetas:', error) 
            }
        },
        verreceta(id){
            console.log(id)
            this.$router.push(`/recipes/${this.categoria}/${id}`)
        }
    }
} 
</script>

<style lang="sass" scoped>
    *
        margin: 0
        padding: 0
    .menu
        width: 100%
        height: 100vh
        display: flex
        align-items: center
        flex-direction: column
        background: #111111
        &__categoria
            display: flex
            justify-content: space-between
            align-items: center
            width: 90%
            a
                text-decoration: none
                i
                    color: white
                    font-size: 30px
                    padding: 10px
                    border: 2px solid white
                    border-radius: 50%
                    width: 30px
                    display: flex
                    justify-content: center
                    align-items: center
                    cursor: pointer
            h1
                margin: 30px 0
                color: white
                font-size: 50px
        &__img
            width: 100%
            height: 100%
            display: grid 
            grid-template-columns: repeat(2, 1fr) 
            grid-template-rows: repeat(2, 1fr)
            &__conts
                border: 1px solid white
                display: flex
                justify-content: center
                align-items: center 
                &__cont
                    display: flex
                    justify-content: center
                    align-items: center 
                    cursor: pointer
                    p
                        color: white
                  
</style>

