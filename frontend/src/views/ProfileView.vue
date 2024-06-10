<template>
    <section class="profile">
        <section class="profile__img">
            <HeaderBlack></HeaderBlack>
            <img class="home__img__img" src="@/img/perfil.webp" alt="">
        </section>
        <section class="profile__info">
            <section class="profile__info__cont">
                <section class="profile__info__cont__first">
                    <section class="profile__info__cont__first__izq">
                        <h3>Bienvenido {{ user }} </h3>
                        
                    </section>
                    <section class="profile__info__cont__first__der">
                        <svg @click.prevent="deleteAccount()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                    </section>
                    
                </section>
                <section class="profile__info__cont__texto">
                    <h1>Tus recetas</h1>
                </section>
                <section class="profile__info__cont__galeria">
                    <section v-if="recetas.length > 0" class="profile__info__cont__galeria__scroll">
                        <div v-for="receta in recetas" :key="receta._id">
                            <img :src="receta.foto" alt="">
                        </div>
                    </section>
                    <section v-else class="profile__info__cont__galeria__scroll">
                        <h1>No has creado ninguna receta</h1>
                    </section>
                </section>
            </section>
        </section>
    </section>
</template>

<script>
import Cookies from 'js-cookie'
import axios from 'axios'
import HeaderBlack from '@/components/HeaderBlack.vue'
export default {

    components: {
        HeaderBlack
    },
    data() {
        return {
            recetas: [],
            user: Cookies.get("user"),
            usrr: [] 
        }
    },
    mounted() {
        // si no existe la cookie a la hora de entrar a la interfaz te redirecciona a /identificarse
        if (!Cookies.get("user")) {
            this.$router.push("/identificarse")
        } else {
            this.obtenerRecetas()
            console.log("user",this.usrr)
        }
    },
    methods: {
        async obtenerRecetas() {
            try {
                const respuesta = await axios.get(`http://localhost:3000/profile`, {
                    params: { cookie: Cookies.get("user") }
                })
                console.log(respuesta.data)

                this.recetas = respuesta.data.recetas
                console.log(this.recetas)
                this.usrr = respuesta.data.usuario
                console.log("usurioooooo",this.usrr)

            } catch (error) {
                console.error('Error al obtener las recetas:', error)
                this.$router.push("/error")
            }
        },
        async deleteAccount() {
            try {
                console.log("a")
            } catch (error) {
                this.$router.push("/error")
            }
        }
    }
}

</script>

<style lang="sass" scoped>
    *
        margin: 0
        padding: 0
        font-family: roboto
    .profile
        width: 100%
        background: #8F81BE
        @media (max-width: 430px)
            overflow: hidden                  
        &__img
            width: 100%
            height: 100vh
            display: flex
            justify-content: center
            
        &__info
            width: 100%
            height: 100vh
            display: flex
            justify-content: center
            align-items: center
            background: #8F81BE
            &__cont 
                width: 100%
                height: 100%
                background: #8F81BE
                &__first
                    width: 100%
                    height: 40% 
                    display: flex
                    justify-content: center
                    
                    &__izq
                        width: 45%
                        height: 100%
                        padding-top: 65px
                        h3
                            font-size: 50px
                            color: white
                        h4
                            font-size: 25px
                            margin-top: 40px
                            color: white
                        p
                            color: white

                        
                            
                    &__der
                        width: 45%
                        height: 100%
                        padding-top: 65px
                        display: flex
                        justify-content: flex-end
                        svg
                            color: white
                            width: 30px
                            cursor: pointer
                            height: 30px
                            cursor: pointer
                &__texto 
                    width: 100%
                    display: flex
                    justify-content: flex-end
                    h1
                        width: 95%
                        color: white
                        font-size: 30px  
                &__galeria
                    width: 95%
                    height: auto
                    margin-left: auto
                    height: 50%
                    display: flex
                    background: #8F81BE
                    
                    &__scroll
                        display: flex
                        height: 100%
                        justify-content: space-between
                        overflow-y: hidden
                        overflow-x: scroll
                        scrollbar-color:   #fff #8F81BE
                        scrollbar-width: thin
                        display: flex
                        align-items: center
                        background: #8F81BE
                        h1
                            color: white
                            font-size: 30px
                            width: 100%
                            margin-left: 30px
                        div
                            width: 600px
                            height: 500px
                            display: flex
                            margin-right: 30px
                            border-radius: 20px
                            display: flex
                            align-items: center
                            justify-content: center
                            @media (max-width: 430px)
                                width: 400px
                                height: 300px
                            
                            
                            
                            img
                                width: 600px
                                height: 400px
                                border-radius: 20px
                                @media (max-width: 430px)
                                    width: 300px
                                    height: 200px
                                
    
</style>