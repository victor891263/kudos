<template>
    <div id='all-chats-container'>
        <template v-if="chats.data">
            <template v-if="chats.data?.length > 0">
                <div v-if="filteredChats.length > 0" id='all-chats'>
                    <InboxChatsChat v-for="chat in filteredChats" :chat="chat" v-bind:key="chat._id" />
                </div>
                <span v-else class='h2'>No chats found</span>
            </template>
            <div v-else>
                <span class='h2'>No chats yet</span>
                <p>Send a message or create a group to start engaging</p>
            </div>
        </template>
        <div v-else-if="chats.error">
            <span class='h2'>Error</span>
            <p>Failed to retrieve chats. Reason: {{ chats.error }}</p>
        </div>
        <span v-else class='h2'>Loading chats...</span>
    </div>
</template>

<script setup lang='ts'>
import { chats } from '@/store/serverResponse'
import {currentUser} from '@/store/misc'
import InboxChatsChat from '@/components/InboxChatsChat.vue'
import {computed, defineProps} from "vue";

const props = defineProps<{
    filterKeyword: string
}>()

const filteredChats = computed(() => {
    if (chats.value.data) {
        return chats.value.data.filter(chat => chat.members.find(member => member.name.includes(props.filterKeyword) && (member.name !== currentUser.value?.name)))
    }
    return []
})
</script>

<style>
#all-chats-container {
    overflow-x: hidden;
    overflow-y: auto;
}

#all-chats-container::-webkit-scrollbar {
    width: 0;
}

#all-chats-container > *:not(#all-chats) {
    margin: auto;
    padding: 1rem;
}

#all-chats-container .h2 + p {
    margin-top: 0.8rem;
}
</style>