<template>
  <section class="menu">
    <section class="menu__cont">
      <section class="menu__cont__videoCont">
        <video autoplay loop muted playsinline>
          <source src="@/img/chefLogin.mp4" type="video/mp4">
        </video>
      </section>
      <section class="menu__cont__der">
        <div class="menu__cont__der__contform">
          <form @submit.prevent="restablecerContrasena" method="post">
            <h2>Restablecer</h2>
            <input type="password" maxlength="15" v-model="nuevaContra" placeholder="Nueva Contraseña" required>
            <button type="submit">Restablecer</button>
          </form>
        </div>
      </section>
    </section>
  </section>
</template>


<script>
import axios from 'axios'
import {useToast} from "vue-toastification"

export default {
    data() {
        return {
            toast:useToast(),
            nuevaContra: ''
        }
    },
    methods:{
      async restablecerContrasena() {
      try {
        console.log(this.$route.params.token)
        const response = await axios.post(`http://localhost:3000/reset/${this.$route.params.token}`, {
          nuevaContra: this.nuevaContra,
          
        })
        if (response.data.success) {
          this.toast.success('Contraseña restablecida exitosamente.', {position: 'top-right',timeout: 3000
          })
          this.$router.push('/identificarse')
        } else {
          this.toast.error('Ha habido un error al restablecer la contraseña.', {
            position: 'top-right',
            timeout: 3000
          })
        }
      } catch (error) {
        console.error('Error al cambiar la contraseña:', error)
        this.toast.error('Ha ocurrido un error.', {
          position: 'top-right',
          timeout: 3000
        })
      }
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
        background: none
        display: flex
        justify-content: center
        align-items: center
        &__cont
            width: 100%
            height: 100%
            display: flex
            justify-content: center
            align-items: center
            justify-content: space-around
            &__videoCont
                z-index: -5
                position: absolute
                width: 100%
                height: 100%
                display: flex
                justify-content: center
                align-items: center
                overflow: hidden
                @media (max-width: 430px)
                    width: 2000px
                &::before 
                    content: ''
                    position: absolute
                    top: 0
                    left: 0
                    width: 100%
                    height: 100%
                    background-color: black
                    opacity: 0.5
                    z-index: 1
                video
                    
                    display: flex
                    justify-content: center
                    width: 100%
                    height: auto
                    opacity: 0.9
                
            &__der
                display: flex
                justify-content: flex-start
                align-items: center
                width: 100%
                height: 100%
                z-index: 0
                @media (max-width: 430px)
                    width: 100%
                &__contform
                    width: 35%
                    height: 80%
                    background: white
                    display: flex
                    align-items: center
                    flex-direction: column
                    -webkit-box-shadow: 0 4px 10px -1px rgba(180, 171, 175, 0.5882352941), 0 2px 10px -2px rgba(180, 171, 175, 0.5882352941)
                    @media (max-width: 430px)
                        width: 100%
                    @media (min-width: 1300px)
                        height: 100%
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
                        border: none
                        margin-bottom: 40px
                        padding-left: 14px
                        background: #faf4ff
                        border: 1px solid #C4BBA8
                        outline: none
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
                        height: 30%
                        strong
                            cursor: pointer
                            color: #683CFF
                            
</style>