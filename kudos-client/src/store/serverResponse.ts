import { ref } from 'vue'
import IChat from '@/types/chat'
import IMessage from '@/types/message'
import IUser from '@/types/user'
import IGroup from '@/types/group'
import IResponse from '@/types/response'

const chats = ref<IResponse<IChat[] | undefined>>({
    data: undefined,
    error: ''
})
const messages = ref<IResponse<IMessage[]>>({
    data: [],
    error: ''
})
const users = ref<IResponse<IUser[]>>({
    data: [],
    error: ''
})
const groups = ref<IResponse<IGroup[]>>({
    data: [],
    error: ''
})

export { chats, messages, users, groups }