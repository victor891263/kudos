<template>
    <div id='search-box'>
        <GlassIcon/>
        <input type='text' :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder || 'Search'" >
    </div>
</template>

<script setup lang='ts'>
import GlassIcon from '@/icons/GlassIcon.vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
    modelValue: string,
    placeholder: string
}>()

const emits = defineEmits(['update:modelValue'])
</script>

<style scoped>
#search-box {
    justify-content: center;
    position: relative;
}

#search-box svg {
    fill: var(--gray-60);
    height: 0.9rem;
    left: 0.8rem;
    position: absolute;
}

#search-box input {
    border-radius: 0.6rem;
    font-weight: 500;
    padding: 0.6rem 0.6rem 0.6rem 2.3rem;
}

#search-box input::placeholder {
    font-weight: 500;
}
</style>