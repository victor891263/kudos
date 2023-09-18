<template>
  <router-view/>
</template>

<script setup lang='ts'>
/*
import {onMounted} from 'vue'

onMounted(() => {
    if (window.outerWidth < 540) {
        document.getElementsByTagName('html')[0].style.fontSize = '15px'
    }
})
*/
</script>

<style>
#app, #app * {
  display: flex;
  flex-direction: column;
}

#app {
  min-height: 100vh;
  min-width: 100%;
}

#app * {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: var(--gray-30);
}
</style>
