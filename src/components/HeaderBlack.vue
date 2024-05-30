<template>
  
    <section class="home__img__header">
      <i class="home__img__header__i"></i>
      <img src="@/img/LogoSimple.png" alt="">
      <a href="/menu"><i class="fa-solid fa-bars"></i></a>
      
    </section>
      
</template>

<script>
export default {
  name: 'HeaderBlack',
  props: {
    msg: String
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
      width: 100%
      justify-content: flex-end
      margin-right: 30px
      margin-top: 0px
      align-items: flex-start
    &__i
      @media (max-width: 430px)
        display: none

    img
      height: 100px
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
      @media (max-width: 430px)
        margin-top: 10px
      i
        font-size: 50px
        cursor: pointer
</style>
