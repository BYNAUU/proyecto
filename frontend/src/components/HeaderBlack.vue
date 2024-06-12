<template>
  <section class="home__img__header">
    <i v-if="!isUserLoggedIn" class="home__img__header__i"></i>
    <svg v-else @click="deleteCookie" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="#ffffff" d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>
    </svg>
    <img src="@/img/LogoWhite.png" alt="Logo">
    <a href="/menu"><i style="color:white" class="fa-solid fa-bars"></i></a>
  </section>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'HeaderBlack',
  data() {
    return {
      isUserLoggedIn: false
    }
  },
  mounted(){
    this.isUserLoggedIn = Cookies.get("user")

  },
  methods: {
    deleteCookie() {
      Cookies.remove("user")
      this.isUserLoggedIn = false
      this.$router.push("/")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .home__img__header
    position: absolute
    z-index: 10
    width: 90%
    margin-top: 40px
    display: flex
    align-items: center
    height: 100px
    justify-content: space-between
    @media (max-width: 430px)
      width: 80%
      justify-content: flex-end
      margin-inline: 30px
      margin-top: 0px
      align-items: flex-start
    @media (min-width: 1300px)
      width: 1250px
    &__i
      @media (max-width: 430px)
        display: none

    img
      width: 700px
      @media (max-width: 430px)
        width: 70%
        height: 100%
        display: none
    a
      text-decoration: none
      color: inherit
      display: flex
      justify-content: center
      align-items: center
      width: 35px
      height: 35px
      @media (max-width: 430px)
        margin-top: 10px
      i
        font-size: 40px
        height: 35px
        cursor: pointer
        
    svg
      width: 35px
      @media (max-width: 430px)
          margin-top: 12px
          margin-right: 270px
      
</style>
