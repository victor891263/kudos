<template>
  <router-view/>
</template>

<style>
#app, #app * {
  display: flex;
  flex-direction: column;
}

#app {
  height: 100vh;
  width: 100vw;
}

#app * {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: var(--gray-30);
}
</style>
