<template>
  <section class="home">
    <section class="home__img">
      <HeaderBlack></HeaderBlack>
      <img class="home__img__img "  src="@/img/home_img.png" alt="">
    </section>
    <section class="home__info">
      
      <section class="home__info__scroll">
        <div class="home__info__scroll__verticalLine">

        </div>
      </section>
      <section class="home__info__about">
        <section class="home__info__about__title">
          <div class="home__info__about__title__izq">
            <p>Next level</p>
          </div>
          <div class="home__info__about__title__der">
            <p>in your kitchen</p>
          </div>
          
        </section>
        <section class="home__info__about__paragraf">
          <div class="home__info__about__paragraf__izq">
            <p>¡Bienvenidos a Deliceo! Este proyecto de desarrollo de aplicaciones web, creado por Arnau Jover Requena como parte de su curso de Desarrollo de Aplicaciones Web (DAW), ofrece a los amantes de la cocina una experiencia única al explorar y compartir recetas, consejos culinarios y experiencias gastronómicas.</p>
            <p>
              Con características como exploración de recetas, una comunidad culinaria activa y opciones de personalización, Deliceo fusiona la pasión por la comida con la tecnología para crear una experiencia culinaria enriquecedora y comunitaria.
            </p>
          </div>
          <div class="home__info__about__paragraf__der">
            <img src="@/img/yo.webp" alt="">
          </div>
        </section>
      </section>
    </section>
    
  </section>
</template>

<script>
// @ is an alias to /src
import HeaderBlack from '@/components/HeaderBlack.vue'

export default {
  name: 'HomeView',
  components: {
    HeaderBlack
  }
}
</script>



<style lang="sass">
  *
    margin: 0
    padding: 0
  .home
    width: 100%
    overflow: hidden
    &__img
      width: 100%
      height: 100vh
      background-repeat: no-repeat
      background-size: cover
      display: flex
      align-items: center
      flex-direction: column
      overflow: hidden
      &__img
        width: 100%
        height: 100%
        @media (max-width: 430px)
          width: 500%
          
      
    &__info
      width: 100%
      height: 100vh
      background: #FF4C00
      @media (max-width: 430px)
        height: 120vh
      
      &__about
        width: 100%
        display: flex
        flex-direction: column
        align-items: center
        &__img
          width: 230px
          height: 200px
          
        &__title
         
          width: 80%
          display: flex
          justify-content: center
          flex-direction: column
          padding-top: 30px
          line-height: 170px
          font-style: normal
          @media (max-width: 430px)
            line-height: 70px
            width: 90%

          
          
          &__izq
            font-size: 180px
            font-weight: 200
            font-weight: 300
            font-style: normal
            @media (max-width: 430px)
              font-size: 60px
          &__der
            width: 100%
            display: flex
            justify-content: flex-end
            font-size: 180px
            font-weight: 300
            font-style: normal
            @media (max-width: 430px)
              font-size: 50px
              justify-content: flex-end
        &__paragraf
          margin-top: 30px
          width: 50%
          font-size: 25px
          line-height: 1.5
          display: flex
          height: 50%
          justify-content: space-between
          padding-top: 50px
          @media (max-width: 430px)
            width: 90%
            flex-direction: column
            height: 60%
            margin-top: 10px
            

          &__izq
            width: 50%
            font-size: 20px
            display: flex
            flex-direction: column
            justify-content: space-between
            color: white
            @media (max-width: 430px)
              width: 100%
            p
              @media (max-width: 430px)
                font-size: 18px
            
          
          &__der
            width: 45%
            height: 100%
            display: flex
            justify-content: flex-end
            @media (max-width: 430px)
              width: 100%
              justify-content: center
              margin-top: 30px
            
            img
              width: 70%
              height: 90%
              background: grey


</style>

