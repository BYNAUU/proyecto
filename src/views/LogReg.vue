<template>
  <section class="menu">
    <section class="menu__cont">
        <section class="menu__cont__izq">
            <img id="logo" src="@/img/LogoSimple.png" alt=""> 
            <img id="salchicha" src="@/img/salchicha.png" alt="">
            <div class="menu__cont__izq__texto">
                <p>El sabor de la perfección</p>
                <div class="menu__cont__izq__texto__background">
                    <p>en cada bocado</p>
                </div>
            </div>
        </section>
        <section class="menu__cont__der">

        </section>
    </section>
    
  </section>
</template>

<script>
export default {

}
</script>

<style scoped lang="sass">
    *
        margin: 0
        padding: 0
    .menu
        width: 100%
        height: 100vh
        background: rgb(188,103,255)
        background: linear-gradient(270deg, rgba(188,103,255,1) 50%, rgba(193,178,244,1) 100%)
        display: flex
        justify-content: center
        align-items: center
        &__cont
            width: 90%
            height: 90%
            background: red
            &__izq
                width: 60%
                height: 100%
                background: green
                display: flex
                flex-direction: column
                justify-content: space-between
                #logo
                    width: 300px
                #salchicha
                    width: 400px
                &__texto
                    width: 100%
                    display: flex
                    justify-content: center
                    align-items: center
                    flex-direction: column
                    height: 30%
                    p
                        font-size: 30px
                    &__background
</style>