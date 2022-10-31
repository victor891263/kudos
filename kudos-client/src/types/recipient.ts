export default interface IRecipient {
    _id: string,
    img: string,
    name: string,
    lastMsg: {
        body: string,
        timeLabel: string
    },
    unseenCount: number,
    status: {
        isOnline: boolean,
        label: string
    },
    isGroup?: boolean
}