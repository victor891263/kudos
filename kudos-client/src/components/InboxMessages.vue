<template>
    <div id='all-messages'>
        <div v-if="messages.data.length > 0" class='data-present'>
            <p v-for="message in messages.data" :class="{ self: checkMsgSender(message._id), other: !checkMsgSender(message._id), item: true }" v-bind:key="message._id" >{{ message.body }}</p>
            <span class='last-interaction'>{{ lastMsgTime }}</span>
            <div ref="msgAnchor" class='messages-anchor'/>
        </div>
        <div v-else-if="messages.error" class='error-present'>
            <span class='h2'>Error</span>
            <p>Failed to retrieve chats. Reason: {{ messages.error }}</p>
        </div>
        <span v-else class='still-loading h2'>Loading messages...</span>
    </div>
</template>

<script setup lang='ts'>
import {computed, onMounted, ref, onUpdated, watchEffect} from 'vue'
import { messages } from '@/store/serverResponse'
import { currentUser } from '@/store/misc'
import calcTime from '@/utilities/calcTime'

const msgAnchor = ref()

const lastMsgTime = computed(() => {
    return calcTime(messages.value.data[messages.value.data.length - 1].createdAt)
})

function checkMsgSender(msgId: string) {
    return messages.value.data.find(message => message._id === msgId)?.sentBy._id === currentUser.value?._id
}

watchEffect(() => {
    if (messages.value.data && msgAnchor.value) msgAnchor.value.scrollIntoView()
})
</script>

<style>
#all-messages .error-present {
    margin: auto;
    padding: 1rem;
}

#all-messages .error-present .h2 {
    margin-bottom: 0.8rem;
}

#all-messages .still-loading {
    margin: auto;
}

#all-messages {
    overflow-y: auto;
}

#all-messages::-webkit-scrollbar {
    width: 0;
}

#all-messages .data-present {
    gap: 0.5rem;
    margin-top: auto;
    padding: 0 1rem;
}

#all-messages .data-present .item {
    border-radius: 0.5rem;
    max-width: 70%;
    padding: 0.4rem 0.8rem;
    width: fit-content;
    word-break: break-all;
}

#all-messages .data-present .item.other {
    background-color: var(--gray-70);
}

#all-messages .data-present .item.self {
    align-self: flex-end;
    background-color: var(--violet-50);
    color: var(--gray-10);
}

#all-messages .data-present .item.other + .item.self {
    margin-top: 0.5rem;
}

#all-messages .data-present .item.self + .item.other {
    margin-top: 0.5rem;
}

#all-messages .data-present .last-interaction {
    color: var(--gray-50);
    font-size: 0.9rem;
    margin-top: -0.3rem;
    padding: 0;
}

#all-messages .data-present .item.self + .last-interaction {
    align-self: flex-end;
}

#all-messages .data-present .messages-anchor {
    margin-top: -0.5rem;
    visibility: hidden;
}
</style>