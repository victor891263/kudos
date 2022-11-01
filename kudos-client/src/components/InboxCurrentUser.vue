<template>
    <div v-if="currentUser" id='current-user'>
        <img v-if="currentUser?.img" class='anonymous' />
        <AnonymousComponent v-else class='anonymous' />
        <router-link :to="{ name: 'account' }">{{ currentUser?.name }}</router-link>
    </div>
</template>

<script setup lang='ts'>
import { currentUser } from '@/store/misc'
import AnonymousComponent from '@/components/AnonymousComponent.vue'
</script>

<style>
#current-user {
    align-items: center;
    flex-direction: row;
}

#current-user .anonymous {
    height: 1.6rem;
    width: 1.6rem;
}

#current-user a {
    color: var(--gray-30) !important;
    font-size: calc(var(--font-size) * 0.95);
    margin-left: 0.4rem;
}
</style>