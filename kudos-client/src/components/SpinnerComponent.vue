<template>
  <div/>
</template>

<style scoped>
div {
  border-style: solid;
  border-width: 3px;
  border-bottom-color: transparent !important;
  border-radius: 50%;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>