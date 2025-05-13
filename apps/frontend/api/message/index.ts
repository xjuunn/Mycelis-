import type { Types } from "@mycelis/database";
import { PageResult, Result } from "@mycelis/types";

/** 发送消息 Socket */
export function send(dto: CreateMessageDto) {
    return useSocket()?.emit('message:send', dto) ?? new Result({}, 900, 'useSocket() 为null');
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

/** 创建消息 */
function create(dto: CreateDto) {
    return useAxios().axios.post<Result<Types.Message>>('/message/create', dto);
}

// 创建消息类
export type CreateDto = {
    receiverId?: number;
    message?: string;
    replyTo?: number;
    extra?: string;
}

// 搜索消息类
export class SearchDto {
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

/** 发送的消息列表 */
function sentlist(dto: SearchDto, pageInfo: PageResult) {
    return useAxios().axios.post<PageResult<Types.Message[]>>('/message/sentlist', { ...dto, ...pageInfo });
}

/** 接收的消息列表 */
function receivedlist(dto: SearchDto, pageInfo: PageResult) {
    return useAxios().axios.post<PageResult<Types.Message[]>>('/message/receivedlist', { ...dto, ...pageInfo });
}

/** 和某人的消息列表 */
function listByFriend(dto: SearchDto, pageInfo: PageResult) {
    return useAxios().axios.post<PageResult<Types.Message[]>>('/message/listbyfriend', { ...dto, ...pageInfo });
}

/** 搜索单条消息 */
function findOne(id: number) {
    return useAxios().axios.get<Result<Types.Message>>('/find/' + id);
}

/** 更新消息 */
function update(id: number, dto: UpdateDto) {
    return useAxios().axios.patch<Result<Types.Message>>('/message/' + id, dto);
}

// 更新消息类
export class UpdateDto {
    message?: string;
    isPinned?: boolean;
}

/** 删除消息 */
function del(id: number) {
    return useAxios().axios.delete<Result<Types.Message>>('/message/' + id);
}
