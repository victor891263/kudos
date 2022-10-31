export default interface IMessage {
    _id: string,
    body: string,
    chat?: {
        _id: string
    },
    sentBy: {
        _id: string
    },
    createdAt: string
}