import { Types } from "@mycelis/database";

export class SearchMessageDto {
    id?: number;
    senderId?: number;
    receiverId?: number;
    message?: string;
    type?: Types.MessageType;
    origin?: Types.MessageOrigin;
    status?: Types.MessageStatus;
    replyTo?: number;
    isPinned?: boolean;
    createAt?: string;
    updateAt?: string;
    readAt?: string;
}