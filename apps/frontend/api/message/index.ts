import { Enums, Model, PageRequest, PageResult, Result } from "@mycelis/types";
import qs from 'qs';

export type MessageANDSenderReceiver = Model.Message & { sender: Model.User, receiver: Model.User };

/** 发送消息 Socket */
export async function send(dto: CreateMessageDto) {
    const msg = await useSocket()?.emit('message:send', dto) ?? new Result({}, 900, 'useSocket() 为null');
    useEmitt().emitter.emit('message:send', msg.data);
    return msg;
}
/** 已读 */
export async function read(friendId: number) {
    return await useSocket()?.emit('message:userreadAll', friendId);
}

/** 当接收消息 */
export function onReceived(listener: (msg: MessageANDSenderReceiver) => void) {
    const handler = (data: unknown) => {
        listener(data as MessageANDSenderReceiver);
    }
    useSocket()?.socket?.on('message:receive', handler)
    onUnmounted(() => useSocket()?.socket?.off('message:receive', handler))
}

/** 当发送消息 */
export function onSend(listener: (msg: MessageANDSenderReceiver) => void) {
    const handler = (msg: unknown) => {
        listener(msg as MessageANDSenderReceiver)
    }
    useEmitt().emitter.on('message:send', handler);
    onUnmounted(() => { useEmitt().emitter.off('message:send', handler) })
}

/** 当好友读取信息 */
export function onRead(listener: (userId: number) => void) {
    const handler = (data: unknown) => {
        listener(data as number)
    }
    useSocket()?.socket?.on('message:readall', handler);
    onUnmounted(() => { useSocket()?.socket?.off('message:readll', handler) })

}

// 创建消息类
export type CreateMessageDto = {
    // 接收者ID
    receiverId: number;
    // 消息
    message: string;
    // 消息类型
    type?: Enums.MessageType;
    // 消息源
    origin?: Enums.MessageOrigin;
    // 回复的消息ID
    replyTo?: number;
    // 额外信息
    extra?: string;
    // 是否置顶
    isPinned?: boolean;
}

/** 创建消息 */
export function create(dto: CreateDto) {
    return useAxios().axios.post<Result<Model.Message>>('/message/create', dto);
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
    type?: Enums.MessageType;
    origin?: Enums.MessageOrigin;
    status?: Enums.MessageStatus;
    replyTo?: number;
    isPinned?: boolean;
    createAt?: string;
    updateAt?: string;
    readAt?: string;
}

/** 发送的消息列表 */
export function sentlist(dto: SearchDto, pageInfo: PageRequest) {
    return useAxios().axios.post<PageResult<Model.Message>>('/message/sentlist?' + qs.stringify(pageInfo), dto);
}

/** 接收的消息列表 */
export function receivedlist(dto: SearchDto, pageInfo: PageRequest) {
    return useAxios().axios.post<PageResult<Model.Message>>('/message/receivedlist?' + qs.stringify(pageInfo), dto);
}

/** 和某人的消息列表 */
export function listByFriend(dto: SearchDto, pageInfo: PageRequest) {
    return useAxios().axios.post<PageResult<Model.Message>>('/message/listbyfriend?' + qs.stringify(pageInfo), dto);
}

/** 搜索单条消息 */
export function findOne(id: number) {
    return useAxios().axios.get<Result<Model.Message>>('/find/' + id);
}

/** 更新消息 */
export function update(id: number, dto: UpdateDto) {
    return useAxios().axios.patch<Result<Model.Message>>('/message/' + id, dto);
}

// 更新消息类
export class UpdateDto {
    message?: string;
    isPinned?: boolean;
}

/** 删除消息 */
export function del(id: number) {
    return useAxios().axios.delete<Result<Model.Message>>('/message/' + id);
}

/** 获取消息用户列表 */
export function getFriendList(pageInfo: PageRequest) {
    return useAxios().axios.get<PageResult<Model.Message & { sender: Model.User, receiver: Model.User, unReadnum: number }>>('/message/friendlist?' + qs.stringify(pageInfo));
}

/** 设置好友的所有消息为已读 */
export function setAllRead(friendId: number) {
    return useAxios().axios.get<Result>('/message/read/' + friendId);
}

/**
 * 设置一条好友的消息为已读
 * @param friendId 好友Id
 * @param id 消息ID
 */
export function setItemRead(friendId: number, id: number) {
    useAxios().axios.get(`/message/read/${friendId}/${id}`)
}

