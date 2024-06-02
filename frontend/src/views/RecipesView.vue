<template>
  <section class="recetas">
    <div class="recetas__img">
      <HeaderBlack></HeaderBlack>
    </div>
    
    <section class="recetas__info">
      <h2 class="izq" data-aos="fade-right" @click="recetasmenu(1)">Carnes</h2>
      <h2 class="der" data-aos="fade-left" @click="recetasmenu(2)">Mariscos</h2>
      <h2 class="izq" data-aos="fade-right" @click="recetasmenu(3)">Vegana</h2>
      <h2 class="der" data-aos="fade-left" @click="recetasmenu(4)">Pasta</h2>
      <h2 class="izq" data-aos="fade-right" @click="recetasmenu(5)">Arroces</h2>
      <h2 class="der" data-aos="fade-left" @click="recetasmenu(6)">Postres</h2>
      
      
      
    </section>
    
  </section>
</template>

<script>
// @ is an alias to /src
import HeaderBlack from '@/components/HeaderBlack.vue'

export default {
  name: 'recetasView',
  components: {
    HeaderBlack
  },
  methods:{
    recetasmenu(number){
      if (number == 1){
        this.$router.push("/recipes/carne")
      }
      if (number == 2){
        this.$router.push("/recipes/mariscos")
      }
      if (number == 3){
        this.$router.push("/recipes/vegana")
      }
      if (number == 4){
        this.$router.push("/recipes/pasta")
      }
      if (number == 5){
        this.$router.push("/recipes/arroces")
      }
      if (number == 6){
        this.$router.push("/recipes/postres")
      }
      
    }
  }
}
</script>



<style lang="sass">
  *
    margin: 0
    padding: 0
  .recetas
    width: 100%
    &__img
      background-image: url('@/img/recetas.webp') 
      width: 100%
      height: 100vh
      background-repeat: no-repeat
      background-size: cover
      display: flex
      align-items: center
      flex-direction: column
      
    &__info
      width: 100%
      height: 100vh
      display: grid
      justify-content: center
      align-items: center
      
      grid-template-rows: 10%
      row-gap: 4px
      @media (max-width: 430px)
        display: flex
        flex-direction: column
        gap: 10px
      .izq
        padding-right: 100px
      .der
        padding-left: 100px
          
      h2
        font-size: 100px
        cursor: pointer
        @media (max-width: 430px)
          font-size: 50px
      

</style>

