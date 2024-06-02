<template>
    <section class="menu">
        <section class="menu__cont">
            <section class="menu__cont__izq">
                <img id="logo" src="@/img/LogoSimple.png" alt="">
                <img id="salchicha" src="@/img/salchicha.png" alt="">
                <div class="menu__cont__izq__texto">
                    <p>El sabor de la perfección</p>
                    <div class="menu__cont__izq__texto__background">
                        <p>en cada bocado</p>
                    </div>
                </div>
            </section>
            <section class="menu__cont__der">
                <div class="menu__cont__der__contform">
                    <form v-if="!isRegistering && !esconder" @submit.prevent="loginUser" method="post">
                        <h2>Login</h2>
                        <input type="text" v-model="usuario" placeholder="Usuario">
                        <input type="text" v-model="correo" placeholder="Correo">
                        <input type="password" v-model="contrasena" placeholder="Contraseña">
                        <div class="menu__cont__der__contform__olvidado">
                            <p @click="toogleFormTwo">¿Has olvidado la contraseña?</p>
                        </div>
                        <button type="submit">Login</button>
                    </form>


                    <form v-else-if="isRegistering" @submit.prevent="registerUser" method="post">
                        <h2>Register</h2>
                        <input type="text" v-model="usuario" placeholder="Usuario">
                        <input type="text" v-model="correo" placeholder="Correo">
                        <input type="password" v-model="contrasena" placeholder="Contraseña">
                        <button type="submit">Crear cuenta</button>
                    </form>


                    <form v-else @submit.prevent="pregcontra" method="post">
                        <h2>Recuperar</h2>
                        <input type="email" v-model="correo" placeholder="Correo">
                        <button type="submit">Enviar</button>
                        <div>
                            <p id="volver" @click="toogleFormTwo">Volver al login</p>
                        </div>
                        
                    </form>


                    <div class="menu__cont__der__contform__reg" v-if="!esconder">
                        <p v-if="!isRegistering">¿Necesitas crear una cuenta? <strong @click="toggleForm">Registrate</strong></p>
                        <p v-else>¿Ya tienes una cuenta? <strong @click="toggleForm">Inicia sesión</strong></p>
                    </div>
                </div>
            </section>
        </section>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Cookies from 'js-cookie'
import axios from 'axios'
import {useToast} from "vue-toastification"

export default {
    data() {
        return {
            usuario: "",
            correo: "",
            contrasena: "",
            isRegistering: false,
            esconder: false,
            toast:useToast()
        }
    },
    computed: {
        ...mapState(['user', 'contra', 'correo'])
    },
    methods: {
        ...mapActions(['login', 'register']),
        async loginUser() {
            try {
                const success = await this.login({
                    usuario: this.usuario,
                    correo: this.correo,
                    contrasena: this.contrasena,
                    action: "login"
                })
                if (success) {
                if (Cookies.get("user")) {
                    // Si existe la elimina
                    Cookies.remove("user")
                }
                // Crear una nueva cookie con el nombre del usuario
                Cookies.set("user", this.usuario, { expires: 7 }) //La cookie expira en 7 días
                this.$router.push("/")
                this.toast.success("Logeado Exitosamente", {
                        position: "top-right",timeout: 5000,closeOnClick: true,pauseOnFocusLoss: true,pauseOnHover: true,draggable: true,draggablePercent: 0.6,showCloseButtonOnHover: false,hideProgressBar: true,closeButton: "button",icon: true,rtl: false
                })
                } else {
                    this.toast.error("Datos mal introducidos", {
                        position: "top-right",timeout: 5000,closeOnClick: true,pauseOnFocusLoss: true,pauseOnHover: true,draggable: true,draggablePercent: 0.6,showCloseButtonOnHover: false,hideProgressBar: true,closeButton: "button",icon: true,rtl: false
                    })
                }
            } catch (error) {
                console.error(error)
                this.toast.error(error, {
                        position: "top-right",timeout: 5000,closeOnClick: true,pauseOnFocusLoss: true,pauseOnHover: true,draggable: true,draggablePercent: 0.6,showCloseButtonOnHover: false,hideProgressBar: true,closeButton: "button",icon: true,rtl: false
                    })
            }
                },



        async registerUser() {
            try {
                const success = await this.register({
                usuario: this.usuario,
                correo: this.correo,
                contrasena: this.contrasena,
                action: "register"
                })
                if (success) {
                    if (Cookies.get("user")) {
                    Cookies.remove("user")
                    }
                    // Crear una nueva cookie con el nombre del usuario
                    Cookies.set("user", this.usuario, { expires: 7 }) // La cookie expira en 7 días
                    this.$router.push("/")
                    this.toast.success("Registrado Exitosamente", {
                        position: "top-right",timeout: 5000,closeOnClick: true,pauseOnFocusLoss: true,pauseOnHover: true,draggable: true,draggablePercent: 0.6,showCloseButtonOnHover: false,hideProgressBar: true,closeButton: "button",icon: true,rtl: false
                    })
                } else {
                    this.toast.error("Datos mal introducidos", {
                        position: "top-right",timeout: 5000,closeOnClick: true,pauseOnFocusLoss: true,pauseOnHover: true,draggable: true,draggablePercent: 0.6,showCloseButtonOnHover: false,hideProgressBar: true,closeButton: "button",icon: true,rtl: false
                    })
                }
            }catch (error) {
                console.error(error)
                this.toast.error(error, {
                        position: "top-right",timeout: 5000,closeOnClick: true,pauseOnFocusLoss: true,pauseOnHover: true,draggable: true,draggablePercent: 0.6,showCloseButtonOnHover: false,hideProgressBar: true,closeButton: "button",icon: true,rtl: false
                })
            }
        },







        
        async pregcontra() {
            try {
                const response = await axios.post("http://localhost:3000/identificarse", {correo: this.correo,action: "psswd"})
                
                if (response.data.success){
                    console.log("revisa tu correo")
                } else {
                    console.log("ha habido un error")
                }
            } catch (error){
                console.error(error)
                this.$router.push("/error")
                
            }
        },

        toggleForm() {
            this.isRegistering = !this.isRegistering
            this.esconder = false 
        },

        toogleFormTwo() {
            this.esconder = !this.esconder
            this.isRegistering = false 
        }
    }
}
</script>



<style scoped lang="sass">
    *
        margin: 0
        font-family: "Inter", sans-serif
        padding: 0
    
    .menu
        width: 100%
        height: 100vh
        background: rgb(188,103,255)
        background: linear-gradient(270deg, rgba(188,103,255,1) 50%, rgba(193,178,244,1) 100%)
        display: flex
        justify-content: center
        align-items: center
        &__cont
            width: 90%
            height: 90%
            display: flex
            justify-content: center
            align-items: center
            &__izq
                width: 60%
                height: 80%
                display: flex
                flex-direction: column
                justify-content: space-between
                @media (max-width: 430px)
                    display: none
                #logo
                    width: 300px
                    margin-inline: auto
                #salchicha
                    margin-inline: auto
                    width: 400px
                &__texto
                    width: 100%
                    display: flex
                    justify-content: flex-end
                    align-items: center
                    flex-direction: column
                    height: 30%
                    p
                        font-size: 40px
                        margin-bottom: 10px
                    &__background
                        background-image: url('@/img/fondo.png')
                        width: 33%
                        display: flex
                        justify-content: center
                        align-items: center
            &__der
                display: flex
                justify-content: center
                align-items: center
                width: 40%
                height: 100%
                @media (max-width: 430px)
                    width: 100%
                &__contform
                    width: 80%
                    height: 80%
                    background: white
                    border-radius: 20px
                    display: flex
                    align-items: center
                    flex-direction: column
                    -webkit-box-shadow: 0 4px 10px -1px rgba(180, 171, 175, 0.5882352941), 0 2px 10px -2px rgba(180, 171, 175, 0.5882352941)
                    @media (max-width: 430px)
                        width: 100%
                    #volver
                        color: #683CFF
                        margin-top: 30px
                        cursor: pointer
                    h2
                        margin: 30px 0px
                        font-size: 50px
                        form
                            width: 100%
                            height: 100%
                    form
                        width: 100%
                        height: 100%
                        display: flex
                        align-items: center
                        flex-direction: column
                    input
                        width: 87%
                        height: 45px
                        border: 2px solid black
                        border-radius: 10px
                        margin-bottom: 40px
                        padding-left: 14px
                    button
                        width: 90%
                        height: 50px
                        background: black
                        border-radius: 10px
                        color: white
                        border: none
                        font-size: 20px
                    &__olvidado
                        display: flex
                        width: 90%
                        justify-content: flex-end
                        margin: 30px 0
                        font-weight: bold
                        p
                           color: #683CFF
                    &__reg
                        display: flex
                        width: 90%
                        justify-content: flex-end
                        margin: 30px 0
                        font-weight: medium
                        font-size: 18px
                        strong
                            cursor: pointer
                            color: #683CFF
                            
</style>