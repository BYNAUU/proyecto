<template>
  
    <section class="home__img__header">
      <i></i>
      <img src="@/img/LogoBlack.png" alt="">
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
    width: 1800px
    margin-top: 40px
    display: flex
    align-items: center
    height: 100px
    justify-content: space-between
    a
      text-decoration: none
      color: inherit
      i
        font-size: 50px
        cursor: pointer
</style>
