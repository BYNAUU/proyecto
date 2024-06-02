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
                        <i @click.prevent="deleteAccount()" class="fa-solid fa-arrow-right-from-bracket"></i>
                    </section>
                    
                </section>
                <section class="profile__info__cont__texto">
                    <h1>Este es tu listado de recetas creadas por ti!</h1>
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
                const user = Cookies.get("user")
                await axios.post(`http://localhost:3000/delete`, {
                    cookie: user
                })
                console.log("nombreee", user)
                Cookies.remove("user")
                this.$router.push("/")
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
        background: rgb(11,14,15)
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
            background: #191b1f
            &__cont 
                width: 100%
                height: 100%
                background: #191b1f
                &__first
                    width: 100%
                    height: 50% 
                    display: flex
                    
                    &__izq
                        width: 50%
                        height: 100%
                        padding-top: 35px
                        h3
                            font-size: 50px
                            color: white
                            padding-left: 30px
                            font-family: Noto Serif
                        h4
                            font-size: 25px
                            margin-top: 40px
                            color: white
                            padding-left: 30px
                        p
                            color: white
                            padding-left: 30px

                        
                            
                    &__der
                        width: 50%
                        height: 100%
                        padding-top: 35px
                        display: flex
                        justify-content: flex-end
                        i
                            color: white
                            font-size: 30px
                            margin-right: 30px
                            cursor: pointer
                &__texto 
                    h1
                        color: white
                        margin-left: 30px
                        font-size: 30px      
                &__galeria
                    width: 100%
                    height: 50%
                    display: flex
                    background: #191b1f
                    
                    &__scroll
                        display: flex
                        height: 100%
                        justify-content: space-between
                        overflow-y: hidden
                        overflow-x: scroll
                        scrollbar-color:   #fff #191b1f
                        scrollbar-width: thin
                        display: flex
                        align-items: center
                        background: #191b1f
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
                            margin-left: 30px
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