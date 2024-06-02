<template>
    <section class="menu">
        <section class="menu__header">
            <HeaderWhite></HeaderWhite>
        </section>
        <section class="menu__home">
            <section id="cont1" class="menu__home__card"> 
                <img @click="GoHome()" src="@/img/home_img.png" alt="">
                <h1>Home</h1>
            </section>
            <section id="cont2" class="menu__home__card"> 
                <img @click="GoRecipes()" src="@/img/recetas.webp" alt="">
                <h1>Recetas</h1>
            </section>
            <section id="cont3" class="menu__home__card">
                <img @click="GoProfile()" src="@/img/perfil.webp" alt="">
                <h1>Perfil</h1>
            </section>
        </section>
    </section>
</template>

<script>
// @ is an alias to /src
import HeaderWhite from '../components/HeaderWhite.vue'


export default {
  name: 'HomeView',
  components: {
    HeaderWhite
  },
  methods:{
    GoHome(){
        this.$router.push("/")
    },
    GoRecipes(){
        this.$router.push("/recipes")
    },
    GoProfile(){
        this.$router.push("/profile")
    }
  },
  
}
</script>



<style lang="sass" scoped>
*
    margin: 0
    padding: 0
    scrollbar-color: #fff black
    scrollbar-width: thin
    .menu
        display: flex
        flex-direction: column
        background: black
        height: 100vh
        overflow-y: hidden
        
        
        &__header
            position: fixed
            right:3.5%
            margin-inline: auto !important

    
        &__home
            background: black
            width: 300%
            height: 100%
            display: flex
            
            align-items: center
            overflow-y: hidden
            #cont1
                display: flex
                justify-content: center
                align-items: center
                width: 1900px
                height: 1000px
                @media (max-width: 430px)
                    width: 100%
                    height: 100%
            #cont2
                display: flex
                justify-content: center
                align-items: center
                width: 1900px
                height: 1000px
                @media (max-width: 430px)
                    width: 100%
                    height: 100%
            #cont3
                display: flex
                justify-content: center
                align-items: center
                width: 1900px
                height: 1000px
                @media (max-width: 430px)
                    width: 100%
                    height: 100%
            .menu__home__card
                position: relative
                overflow: hidden
                // border-radius: 20px
                img
                    width: 1000px
                    height: 600px
                    border-radius: 20px
                    border: 3px solid black
                    animation: mew
                    animation-duration: 1s
                    animation-fill-mode: forwards
                    @media (max-width: 430px)
                        width: 100%
                        height: 200px
                    
                h1
                    font-family: "Playfair Display", serif
                    font-size: 100px
                    position: absolute
                    top: 50%
                    left: 50%
                    transform: translate(-50%, -50%)
                    padding: 10px
                    color: rgba(255,255,255,1)
                    font-weight: 400
                    font-style: italic
                    letter-spacing: 2px
                    @media (max-width: 430px)
                        font-size: 30px

@keyframes mew 
    0%
        transform: scale(2.5)
        filter: blur(0px)
    100%
        transform: scale(0.8)
        filter: blur(2px)

                    

    
  


</style>

