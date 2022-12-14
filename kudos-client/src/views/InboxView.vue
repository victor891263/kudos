<template>
    <div id='inbox' :class="{ 'current-chat-selected': currentChat, 'current-chat-not-selected': !currentChat }">
        <div class='list-of-convos'>
            <div class='header'>
                <div>
                    <InboxCurrentUser/>
                    <div class='new-buttons'>
                        <router-link :to="{ name: 'newConversation' }"><SendIcon/></router-link>
                        <router-link :to="{ name: 'newGroup' }"><GroupIcon/></router-link>
                        <router-link :to="{ name: 'joinGroup' }"><JoinGroupIcon/></router-link>
                    </div>
                </div>
                <SearchComponent v-model="keywordToFilterChats" :placeholder="'Enter recipient to filter'" class='search' />
            </div>
            <span class='chat-count'>{{ chats.data?.length || '0' }} chat{{ (chats.data?.length > 1) ? 's' : '' }} retrieved from server</span>
            <InboxChats :filterKeyword="keywordToFilterChats"/>
        </div>
        <div v-if="!currentChat" class='no-conversation-selected background-gray-80'>
            <div>
                <span class='h2'>No chat opened</span>
                <p>Click on a conversation on the left to expand it and start messaging.</p>
            </div>
        </div>
        <router-view/>
    </div>
</template>


<script setup lang='ts'>
interface IUnseen {
    member: {
        _id: string
    },
    count: number
}

import { io } from 'socket.io-client'
import {ref, watch} from 'vue'
import { useRoute} from 'vue-router'
import jwtDecode from 'jwt-decode'
import { chats, messages, users, groups } from '@/store/serverResponse'
import { socket, currentUser, currentChat } from '@/store/misc'
import InboxCurrentUser from '@/components/InboxCurrentUser.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import InboxChats from '@/components/InboxChats.vue'
import SendIcon from '@/icons/SendIcon.vue'
import GroupIcon from '@/icons/GroupIcon.vue'
import JoinGroupIcon from '@/icons/JoinGroupIcon.vue'
import IChat from '@/types/chat'
import IGroup from '@/types/group'
import IUser from '@/types/user'
import IResponse from '@/types/response'
import IMessage from '@/types/message'

// remove chats from previous user
chats.value.data = undefined

const connectionError = ref('')
const keywordToFilterChats = ref('')

const token = localStorage.getItem('kudos-app:token') as string

currentUser.value = jwtDecode(token)

// Socket initialization
socket.value = io(process.env.VUE_APP_API_URL as string, { auth: { token } })

socket.value?.on('connect', () => console.log('client connected to server'))
socket.value?.on('connect_error', error => connectionError.value = error.message || 'Unknown error occurred while trying to connect to the server')

socket.value?.on('server:update-chats', () => socket.value?.emit('client:get-chats', (response: IResponse<IChat[]>) => chats.value = response))

socket.value?.on('server:update-messages', (message: IMessage) => {
    // update the lastMsg property of the conversation that the message belongs to
    const targetChat = chats.value.data?.find(chat => chat._id === message.chat?._id) as IChat
    targetChat.lastMsg = message

    if (currentChat.value?._id === message.chat?._id) {
        // if the conversation that the message belongs to is currently open, add the message to the messages array and tell the server the new message has been seen
        messages.value.data.push(message)
        socket.value?.emit('client:open-chat', currentChat.value?._id, (response: IResponse<IChat>) => console.log(response))
    } else {
        // if not, increment the amount of messages user hasn't seen in that conversation
        const unseenOfTarget = targetChat.unseen.find(item => item.member._id === currentUser.value?._id) as IUnseen
        unseenOfTarget.count++
    }

    chats.value.data = [targetChat, ...chats.value.data.filter(c => c._id !== targetChat._id)]
})

socket.value?.emit('client:get-chats', (response: IResponse<IChat[]>) => chats.value = response)
socket.value?.emit('client:get-users', (response: IResponse<IUser[]>) => users.value = response)
socket.value?.emit('client:get-groups', (response: IResponse<IGroup[]>) => groups.value = response)

// getting current chat from router parameters
const route = useRoute()

function expandConversation(chatId: string) {
    if (chatId) {
        // remove messages that belong to the previous conversation
        messages.value.data = []

        // change currentChat to the selected conversation
        currentChat.value = chats.value.data?.find(chat => chat._id === chatId)

        // select the particular conversation that the user chose to open
        const selectedChat = chats.value.data?.find(chat => chat._id === chatId) as IChat

        // set the amount of the messages that the user haven't seen in the selected conversation to zero
        const unseenOfSelected = selectedChat.unseen.find(item => item.member._id === currentUser.value?._id) as IUnseen
        unseenOfSelected.count = 0

        // set the amount of the messages that the user haven't seen in the selected conversation to zero (IN THE DATABASE)
        socket.value?.emit('client:open-chat', chatId, (response: IResponse<IChat>) => console.log(response))

        // retrieve the messages that belong to the selected conversation
        socket.value?.emit('client:get-messages', chatId, (response: IResponse<IMessage[]>) => messages.value = response)
    }
}

watch([() => route.name, () => route.params.chatId], ([newName, newId]) => {
    if (newId && (currentChat.value?._id !== newId)) expandConversation(newId as string)
    if (newName === 'inbox') currentChat.value = undefined
})

watch(chats, (newChats, oldChats) => {
    if (newChats.data && !oldChats.data) expandConversation(route.params.chatId as string)
    if (currentChat.value) currentChat.value = newChats.data?.find(chat => chat._id === currentChat.value?._id)
}, { deep: true })
</script>


<style>
#inbox {
    display: grid;
    height: 100vh;
    position: relative;
}

#inbox .list-of-convos {
    height: 100vh;
}

#inbox .list-of-convos {
    display: grid !important;
    grid-template-rows: max-content max-content auto;
}

#inbox .header {
    padding: 1rem 1rem 0 1rem;
}

#inbox .header > div:nth-of-type(1) {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
}

#inbox .new-buttons {
    flex-direction: row;
    gap: 1.1rem;
}

#inbox .new-buttons svg {
    fill: var(--gray-50);
    height: 1.1rem;
}

#inbox .search {
    margin-top: 0.8rem;
}

#inbox .chat-count {
    color: var(--gray-50);
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
}



#inbox .no-conversation-selected {
    align-items: center;
    height: 100%;
    justify-content: center;
    width: 100%;
}

#inbox .no-conversation-selected div {
    max-width: 400px;
}

#inbox .no-conversation-selected .h2 {
    margin-bottom: 0.8rem;
}



@media (min-width: 960px) {
    #inbox {
        grid-template-columns: minmax(320px, 25%) auto;
    }
}



@media (max-width: 960px) {
    #inbox.current-chat-selected .list-of-convos {
        display: none !important;
    }

    #inbox .no-conversation-selected {
        display: none;
    }
}
</style>