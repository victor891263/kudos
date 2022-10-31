import IChat from '@/types/chat'
import IUser from '@/types/user'
import calcTime from '@/utilities/calcTime'

export default function returnRecipient(chat: IChat, currentUser: IUser) {
    const unseenCount = chat.unseen.find(item => item.member._id === currentUser._id)!.count
    if (chat.isGroup) {
        const onlineMembers = chat.members.filter(member => member.status === 'online')
        return {
            _id: chat._id,
            img: chat.img,
            name: chat.name,
            lastMsg: {
                body: chat.lastMsg.body,
                timeLabel: calcTime(chat.lastMsg.createdAt)
            },
            unseenCount,
            status: {
                isOnline: true,
                label: `${onlineMembers.length} user${(onlineMembers.length > 1) ? 's' : ''} online`
            },
            isGroup: true
        }
    } else {
        const otherUser = chat.members.find(member => member._id !== currentUser._id)!
        return {
            _id: otherUser._id,
            img: otherUser.img,
            name: otherUser.name,
            lastMsg: {
                body: chat.lastMsg.body,
                timeLabel: calcTime(chat.lastMsg.createdAt)
            },
            unseenCount,
            status: {
                isOnline: otherUser.status === 'online',
                label: otherUser.status === 'online' ? 'online' : calcTime(otherUser.updatedAt) === 'Now' ? 'seen just now' : `seen ${calcTime(otherUser.updatedAt)} ago`
            }
        }
    }
}