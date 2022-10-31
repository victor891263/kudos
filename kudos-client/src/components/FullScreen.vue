<template>
    <div class="full-screen-box">
        <slot></slot>
        <button @click="onPress" class='back-button'><RightArrowIcon/></button>
    </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import RightArrowIcon from '@/icons/RightArrowIcon.vue'

const router = useRouter()

function onPress() {
    if (router.options.history.state.back) router.go(-1)
    else router.push({ name: 'inbox' })
}
</script>

<style>
.full-screen-box {
    background-color: var(--gray-90);
    height: 100vh;
    padding: 4rem 1rem;
    width: 100vw;
    overflow-y: auto;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
}

.full-screen-box::-webkit-scrollbar {
    width: 0;
}

.full-screen-box .back-button {
    position: absolute;
    top: 1rem;
    left: 1rem;
}

.full-screen-box .back-button svg {
    fill: var(--gray-50);
    height: 0.9rem;
    transform: rotate(180deg);
}
</style>