<template>
    <div id='anonymous'>
        <GroupIconBold v-if="isGroup"/>
        <UserIcon v-else/>
    </div>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue'
import UserIcon from '@/icons/UserIcon.vue'
import GroupIconBold from '@/icons/GroupIconBold.vue'

const props = defineProps<{
    isGroup?: boolean
}>()
</script>

<style>
#anonymous {
    background-color: var(--gray-70);
    border-radius: 50%;
    flex-shrink: 0;
    justify-content: center;
    overflow: hidden;
}

#anonymous svg {
    fill: var(--gray-80);
    height: 50%;
}
</style>