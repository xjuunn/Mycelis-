import { Types } from "@mycelis/database";

export class Message {
    id: number;
    senderId: number;
    sender: Types.User;
    receiverId: number;
    receiver: Types.User;
    message: string;
    type: Types.MessageType;
    origin: Types.MessageOrigin;
    status: Types.UserStatus;
    replyTo: number;
    extra: string;
    isPinned: boolean;
    createAt: string;
    updateAt: string;
    readAt: string;
}
