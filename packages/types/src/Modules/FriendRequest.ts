import { FriendRequestStatus } from "../Enum/index"

export type FriendRequest = {
    id: number
    senderId: number
    receiverId: number
    status: FriendRequestStatus
    createAt: Date
}