export default interface IUser {
    _id: string,
    name: string,
    img: string,
    status: 'online' | 'offline',
    updatedAt: string,
    link?: string,
    about?: string,
    createdAt?: string,
}