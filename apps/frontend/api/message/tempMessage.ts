import { Model, Result } from '@mycelis/types';
export type ReceiveTempMessage = CreateTempMessageDto & { senderId: number, timestamp: number };

/** 发送临时消息 Socket */
export async function sendTemp(dto: CreateTempMessageDto) {
    if (dto.uid === undefined) {
        dto.uid = crypto.randomUUID();
    }
    const msg = await useSocket()?.emit('message:tempSend', dto) ?? new Result({}, 900, 'useSocket() 为null');
    useEmitt().emitter.emit('message:tempSend', msg.data);
    return new Promise((res, rej) => {
        useSocket()?.socket?.on('message:receiveTemp', (data: ReceiveTempMessage) => {
            if (data.uid !== dto.uid) return;
            res(data);
        });
        if (dto.needReply === false) res('ok');
        setTimeout(() => {
            rej(new Error('接收临时消息超时:' + dto.uid));
        }, 5000);
    });
}

/** 当接收临时消息 */
export function onReceivedTemp(listener: (msg: ReceiveTempMessage) => void) {
    const handler = (data: unknown) => {
        listener(data as ReceiveTempMessage);
    }
    useSocket()?.socket?.on('message:receiveTemp', handler)
    onUnmounted(() => useSocket()?.socket?.off('message:receiveTemp', handler))
}

// 临时消息
export type CreateTempMessageDto = {
    // 消息唯一标识符
    uid?: string;
    // 接收者ID
    receiverId: number;
    // 消息
    message: string;
    // 消息类型
    type: 'Reply' | 'Request',
    // 负载
    payload?: any
    // 是否需要答复
    needReply?: boolean;
}

export function init() {
    onReceivedTemp((msg) => {
        if (msg.type === 'Request') doReply(msg);
        else if (msg.type === 'Reply') replyHandle(msg);
    });
}

/** 响应请求，做出回答 */
function doReply(msg: ReceiveTempMessage) {
    if (msg.message === 'getUserInfo') {
        sendTemp({
            uid: msg.uid,
            receiverId: msg.senderId,
            message: 'getUserInfo',
            type: 'Reply',
            payload: {
                user: useAppStore().user,
                peerId: usePeer().peer.id,
            },
            needReply: false
        })
    }
}

/** 处理收到的回答 */
function replyHandle(msg: ReceiveTempMessage) {

}

/** 测试 */
export function test(msg: CreateTempMessageDto) {
    return sendTemp(msg);
}

/** 获取用户详细信息 */
export function getUserInfo(userId: number) {
    return sendTemp({
        receiverId: userId,
        message: "getUserInfo",
        type: 'Request',
        payload: {}
    })
}