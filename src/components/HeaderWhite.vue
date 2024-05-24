<template>
  <section class="home__img">
      <section class="home__img__header">
        <i></i>
        <img src="@/img/LogoWhite.png" alt="">
        <i></i>
      </section>
      
    </section>
</template>

<script>
export default {
  name: 'HeaderWhite',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .home__img__header
    width: 1800px
    margin-top: 40px
    display: flex
    align-items: center
    height: 100px
    justify-content: space-between
    a
      z-index: 15
      text-decoration: none
      color: inherit
      background: red
      i
        font-size: 50px
        cursor: pointer
</style>
