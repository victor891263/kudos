<template>
    <button @click="handleClick" class='one button-with-spinner'>
        <span :class="{ hidden: isLoading }" >{{ label }}</span>
        <SpinnerComponent :class="{ hidden: !isLoading }" class='spinner' />
    </button>
</template>

<script setup lang='ts'>
import {defineProps} from 'vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'

const props = defineProps<{
    handleClick: () => void,
    isLoading: boolean,
    label: string
}>()
</script>

<style>
.button-with-spinner {
    position: relative;
}

.button-with-spinner span {
    color: var(--gray-10) !important;
    font-weight: 600;
}

.button-with-spinner .spinner {
    border-color: var(--gray-10);
    height: 1.4rem;
    width: 1.4rem;

    position: absolute;
}

.button-with-spinner .hidden {
    visibility: hidden;
}
</style>