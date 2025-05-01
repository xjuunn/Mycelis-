import type { Types } from "@mycelis/database";

/** 发送消息 */
export function send(dto: CreateMessageDto) {
    return useSocket().emit('message:send', dto);
}

// 创建消息类
export type CreateMessageDto = {
    // 接收者ID
    receiverId: number;
    // 消息
    message: string;
    // 消息类型
    type?: Types.MessageType;
    // 消息源
    origin?: Types.MessageOrigin;
    // 回复的消息ID
    replyTo?: number;
    // 额外信息
    extra?: string;
    // 是否置顶
    isPinned?: boolean;
}