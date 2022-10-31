<template>
    <div id='conversation' class='background-gray-80'>
        <InboxRecipient/>
        <InboxMessages/>
        <InboxReplyBox/>
    </div>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router'
import {chats, messages} from '@/store/serverResponse'
import {currentChat, currentUser, socket} from '@/store/misc'
import InboxRecipient from '@/components/InboxRecipient.vue'
import InboxMessages from '@/components/InboxMessages.vue'
import InboxReplyBox from '@/components/InboxReplyBox.vue'
import IResponse from '@/types/response'
import IChat from '@/types/chat'
import IMessage from '@/types/message'

const route = useRoute()

// change currentChat to the selected conversation
currentChat.value = chats.value.data.find(chat => chat._id === route.params.id)!

socket.value!.emit('client:open-chat', route.params.id, (response: IResponse<IChat>) => {
    // select the particular conversation that the user chose to open
    const selectedChat = chats.value.data.find(chat => chat._id === route.params.id)!

    // set the amount of the messages that the user haven't seen in the selected conversation to zero
    selectedChat.unseen.find(item => item.member._id === currentUser.value!._id)!.count = 0

    // retrieve the messages that belong to the selected conversation
    socket.value!.emit('client:get-messages', route.params.id, (response: IResponse<IMessage[]>) => messages.value = response)
})
</script>

<style>
#conversation {
    display: grid !important;
    grid-template-rows: max-content auto max-content;
}
</style>