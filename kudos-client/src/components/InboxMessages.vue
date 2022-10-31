<template>
    <div v-if="messages.data.length > 0" id='all-messages'>
        <span v-for="message in messages.data" :class="{ self: checkMsgSender(message._id) }" v-bind:key="message._id" >{{ message.body }}</span>
        <span class='last-interaction'>{{ lastMsgTime }}</span>
        <div ref="msgAnchor" class='messages-anchor'/>
    </div>
    <div v-else-if="messages.error" id='all-messages-error'>
        <h2>Error</h2>
        <p>Failed to retrieve chats. Reason: {{ messages.error }}</p>
    </div>
    <span v-else id='all-messages-loading'>Loading messages...</span>
</template>

<script setup lang='ts'>
import {computed, onMounted, ref, onUpdated} from 'vue'
import { messages } from '@/store/serverResponse'
import { currentUser } from '@/store/misc'
import calcTime from '@/utilities/calcTime'

const msgAnchor = ref()

const lastMsgTime = computed(() => {
    return calcTime(messages.value.data[messages.value.data.length - 1].createdAt)
})

function checkMsgSender(msgId: string) {
    return messages.value.data.find(message => message._id === msgId)!.sentBy._id === currentUser.value!._id
}

onUpdated(() => {
    if (msgAnchor.value) msgAnchor.value.scrollIntoView()
})
</script>

<style>
#all-messages-error {
    margin: auto;
    padding: 1rem;
}

#all-messages-error h2 {
    margin-bottom: 0.8rem;
}

#all-messages-loading {
    font-size: 1.4rem;
    font-weight: 700;
    margin: auto;
}

#all-messages {
    gap: 0.5rem;
    overflow-y: auto;
    padding: 0 1rem;
}

#all-messages::-webkit-scrollbar {
    width: 0;
}

#all-messages span:first-of-type {
    margin-top: auto;
}

#all-messages span {
    background-color: var(--gray-70);
    border-radius: 0.6rem;
    padding: 0.5rem 0.8rem;
    width: fit-content;
}

#all-messages span.self {
    align-self: flex-end;
    background-color: var(--violet-50);
    color: var(--white);
}

#all-messages .last-interaction {
    background: none;
    color: var(--gray-50);
    font-size: 0.8rem;
    margin-top: -0.3rem;
    padding: 0;
}

#all-messages span.self + .last-interaction {
    align-self: flex-end;
}

#all-messages .messages-anchor {
    margin-top: -0.5rem;
    visibility: hidden;
}
</style>