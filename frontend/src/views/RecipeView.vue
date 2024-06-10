<template>
  <section class="menu">
    <section class="menu__info">
        <div class="menu__info__cont">
            <div class="menu__info__cont__title" >
                <p>{{ recetas.nombre }}</p>
            </div>
            <div class="menu__info__cont__tipeoff">
                <p>{{ recetas.tipo }}</p>
                <p>{{ recetas.tipo }}</p>
                <p>{{ recetas.tipo }}</p>
                <p>{{ recetas.tipo }}</p>
            </div>
            <div class="menu__info__cont__back">
                <a href="http://localhost:8080/recipes/"><i class="fa-solid fa-arrow-left"></i></a>
            </div>
        </div>
        <div class="menu__info__down">
            <div class="menu__info__down__left">
                <img :src="recetas.foto" alt="">
            </div>
            <div class="menu__info__down__rigth">
                <p class="menu__info__down__rigth__desc">{{ recetas.descripcion }}</p>
                
                <div class="menu__info__down__rigth__cont" v-for="(paso,index) in recetas.pasos" :key="paso">
                    
                    <p class="menu__info__down__rigth__cont__pasos"><strong>{{index}}. </strong>{{ paso }}</p>
                </div>
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
            recetas: {}, 
            categoria: '',
            id:''
        } 
    },
    mounted() {
        this.categoria = this.$route.params.nombre 
        this.id = this.$route.params.id
        console.log(this.categoria)
        console.log(`http://localhost:3000/recipes/${this.categoria}/${this.id}`)
        console.log(this.recetas)
        this.background(this.categoria)
        this.obtenerReceta() 
    },
    methods:{
        async obtenerReceta() {
            console.log("mew")
            try {
                const respuesta = await axios.get(`http://localhost:3000/recipes/${this.categoria}/${this.id}`) 
                console.log(respuesta.data)
                this.recetas = respuesta.data // Cambiado de receta a recetas
                console.log(this.recetas)
                console.log("oleee")
            } catch (error) {
                console.error(error) 
                this.$router.push("/error")
            }
        },
        background(name){
            const clas = document.querySelector('.menu')
            if (name == "carne"){
                clas.style.background = "#c2b280"
            } if (name == "mariscos"){
                clas.style.background = "#88a1e3"
            }if (name == "vegana"){
                clas.style.background = "#8CBA51"

            }if(name == "pasta"){
                clas.style.background = "#ece2c6"

            }if(name == "arroces"){
                clas.style.background = "#EAC751"

            }if(name == "postres"){
                clas.style.background = "#E2AAA1"

            }
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
        justify-content: center
        align-items: center
        background:#E2AAA1
        @media (max-width: 1430px)
            height: 200vh
        &__info
            width: 90%
            height: 90%
            display: flex
            flex-direction: column
            justify-content: space-between
            &__cont
                width: 100%
                display: flex
                justify-content: space-between
                border-bottom: 1px solid black
                border-top: 1px solid black
                flex-direction: row
                &__title
                    font-size: 60px
                    width: 50%
                    padding: 20px 0
                    display: flex
                    align-items: center
                    @media (max-width: 1430px)
                        width: 100%
                        font-size: 20px
                    
                &__tipeoff
                    justify-content: space-between
                    width: 10%
                    margin-left: 100px
                    margin: 30px 0
                    display: flex
                    flex-direction: column
                    align-items: center
                    font-size: 24px
                    border-left: 1px solid black
                    border-right: 1px solid black
                    @media (max-width: 1430px)
                        display: none
                    p
                        font-family: "Libre Baskerville", serif
                &__back
                    margin: 30px 0
                    cursor: pointer
                    @media (max-width: 1430px)
                        display: none
                    a
                        text-decoration: none
                        color: black
                        i
                            border: 1px solid black
                            padding: 10px
                            border-radius: 50%
                            width: 10px
                            height: 10px
                            display: flex
                            justify-content: center
                            align-items: center

            &__down
                display: flex
                height: 60vh
                width: 100%
                justify-content: space-between
                @media (max-width: 1430px)
                    flex-direction: column
                    height: inherit
                &__left
                    width: 50%
                    height: 100%
                    overflow: hidden
                    display: flex
                    justify-content: center
                    align-items: center
                    @media (max-width: 1430px)
                        width: 100%
                        height: 30%
                
                &__rigth
                    width: 44%
                    display: flex
                    flex-direction: column
                    justify-content: space-between
                    @media (max-width: 1430px)
                        width: 100%
                        height: 65%
                    &__desc
                        margin-bottom: 30px
                        font-size: 25px
                        height: 25%
                        @media (max-width: 430px)
                            margin-bottom: 140px
                    &__cont
                        height: 65%
                        &__pasos
                            font-family: "Roboto"
                            padding-bottom: 5px
                            font-size: 19px
                            strong
                                font-size: 25px
                                font-family: "Libre Baskerville", serif
                                padding-bottom: -5px
                                font-weight: 600

    
</style>
