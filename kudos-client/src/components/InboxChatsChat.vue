<template>
    <router-link :to="{ name: 'conversation', params: { chatId: chat._id } }" :class="{ active: isCurrentChat }" class='each-chat'>
        <img v-if="recipient.img" :src="recipient.img" class='anonymous' />
        <AnonymousComponent v-else :is-group="recipient.isGroup" class='anonymous' />
        <div class='text'>
            <div>
                <span class='username'>{{ recipient.name || '' }}</span>
                <span>{{ recipient.lastMsg.timeLabel }}</span>
            </div>
            <div>
                <div class='msg-body'>
                    <span v-if="isSentByMe">Me:</span>
                    <span>{{ recipient.lastMsg.body }}</span>
                </div>
                <span v-if="recipient.unseenCount > 0">{{ recipient.unseenCount }}</span>
            </div>
        </div>
    </router-link>
</template>


<script setup lang='ts'>
import { computed, defineProps } from 'vue'
import { currentUser, currentChat } from '@/store/misc'
import AnonymousComponent from '@/components/AnonymousComponent.vue'
import returnRecipient from '@/utilities/returnRecipient'
import IChat from '@/types/chat'
import IRecipient from '@/types/recipient'

const props = defineProps<{ chat: IChat }>()

const recipient = computed<IRecipient>(() => returnRecipient(props.chat, currentUser.value!))
const isCurrentChat = computed(() => currentChat.value?._id === props.chat._id)
const isSentByMe = computed(() => props.chat.lastMsg.sentBy._id === currentUser.value?._id)
</script>


<style>
#all-chats .each-chat {
    align-items: center;
    border-right: 2px solid transparent;
    cursor: pointer;
    flex-direction: row;
    margin-top: auto;
    padding: 0.8rem 1rem;
    transition: background-color 0.15s, border-right-color 0.15s;
}

#all-chats .each-chat.active {
    background-color: var(--gray-80);
    border-right-color: var(--violet-50);
}

#all-chats .each-chat:hover {
    background-color: var(--gray-80);
}

#all-chats .each-chat .anonymous {
    height: 3rem;
    width: 3rem;
}

#all-chats .each-chat .text {
    gap: 0.5rem;
    margin-left: 0.7rem;
    overflow: hidden;
    width: 100%;
}

#all-chats .each-chat .text > div {
    flex-direction: row;
    justify-content: space-between;
}

#all-chats .each-chat .username {
    font-weight: 700;
}

#all-chats .each-chat .username + span {
    color: var(--gray-50);
    font-size: 0.9rem;
}

#all-chats .each-chat .msg-body {
    flex-direction: row;
    gap: 0.3rem;
    white-space: nowrap;
}

#all-chats .each-chat .msg-body + span {
    align-items: center;
    background-color: var(--violet-50);
    border-radius: 50%;
    font-size: 0.8rem;
    height: 1.4rem;
    justify-content: center;
    width: 1.4rem;
}
</style>