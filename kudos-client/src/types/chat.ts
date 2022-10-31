import IUser from '@/types/user'
import IMessage from '@/types/message'

export default interface IChat {
    _id: string,
    isGroup: boolean,
    name: string,
    members: IUser[],
    unseen: {
        member: {
            _id: string
        },
        count: number
    }[],
    description: string,
    img: string,
    lastMsg: IMessage,
    createdAt: string
}