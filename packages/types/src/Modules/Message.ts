import { MessageOrigin, MessageStatus, MessageType } from "../Enum/index"

export type Message = {
    id: number
    senderId: number
    receiverId: number
    message: string
    type: MessageType
    origin: MessageOrigin
    status: MessageStatus
    replyTo: number | null
    extra: string | null
    isPinned: boolean
    createAt: Date
    updateAt: Date | null
    readAt: Date | null
}