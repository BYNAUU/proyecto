<template>
  <section class="principal">
    <h1>Upss!!</h1>
    <h2>404 error</h2>
  </section>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$router.push('/')
    }, 5000)
  }
}
</script>

<style lang="sass" scoped>
  .principal
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    font-family: roboto 
    width: 100%
    height: 100vh
    line-height: 100px
    h1
      font-size: 70px
    h2
      font-size: 50px
</style>