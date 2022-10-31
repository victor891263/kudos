import { ref } from 'vue'
import { Socket } from 'socket.io-client'
import IUser from '@/types/user'
import IChat from '@/types/chat'
import IResponse from '@/types/response'

const socket = ref<Socket>()
const currentUser = ref<IUser>()
const currentChat = ref<IChat>()
const currentProfile = ref<IResponse<IUser | undefined>>({
    data: undefined,
    error: ''
})

export { socket, currentUser, currentChat, currentProfile }