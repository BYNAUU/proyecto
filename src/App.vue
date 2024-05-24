<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>
<script>
  import { onMounted } from 'vue'
  import AOS from 'aos'
  import 'aos/dist/aos.css'

  export default {
    name: 'App',
    setup() {
      onMounted(() => {
        AOS.init();
      });
    }
  };
</script>

<style lang="sass" >
  *
    margin: 0
    padding: 0
    scroll-behavior: smooth
    font-family: "Noto Serif", serif
    scrollbar-color:  grey #fff
    scrollbar-width: thin
    

</style>

