<template>
    <div v-if="chats.data" id='all-chats-container'>
        <div v-if="chats.data?.length > 0">
            <div v-if="filteredChats.length > 0" id='all-chats'>
                <InboxChatsChat v-for="chat in filteredChats" :chat="chat" v-bind:key="chat._id" />
            </div>
            <div v-else id="chats-no-search-results">
                <h2>No chats found</h2>
            </div>
        </div>
        <div v-else id="chats-none">
            <h2>No chats yet</h2>
            <p>Send a message or create a group to start engaging</p>
        </div>
    </div>
    <div v-else-if="chats.error" id='chats-error'>
        <h2>Error</h2>
        <p>Failed to retrieve chats. Reason: {{ chats.error }}</p>
    </div>
    <span v-else id='chats-loading'>Loading chats...</span>
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
}

#all-chats {
    overflow-y: auto;
}

#all-chats::-webkit-scrollbar {
    width: 0;
}

#chats-error, #chats-none, #chats-no-search-results {
    margin: auto;
    padding: 1rem;
}

#chats-error h2, #chats-none h2 {
    margin-bottom: 0.8rem;
}

#chats-loading {
    font-size: 1.4rem;
    font-weight: 700;
    margin: auto;
    padding: 1rem;
}
</style>