<template>
    <div v-if="chats.data" id='conversation' class='background-gray-80'>
        <InboxRecipient/>
        <InboxMessages/>
        <InboxReplyBox/>
    </div>
</template>

<script setup lang='ts'>
import {chats} from '@/store/serverResponse'
import InboxRecipient from '@/components/InboxRecipient.vue'
import InboxMessages from '@/components/InboxMessages.vue'
import InboxReplyBox from '@/components/InboxReplyBox.vue'
</script>

<style>
#conversation {
    display: grid !important;
    grid-template-rows: max-content auto max-content;
    height: 100vh;
}
</style>