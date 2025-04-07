import type { Types } from '@mycelis/database'
import qs from 'qs'
const base = "/friend-request"

/**
 * 创建好友请求
 * @param senderId 发送者ID
 * @param receiverId 接收者ID
 */
export function adminCreate(senderId: number, receiverId: number) {
    return useAxios().axios.post(base + '?' + qs.stringify({ senderId, receiverId }))
}

export function adminFindAll(skip: number = 0, take: number = 15) {
    return useAxios().axios.get(base + "?" + qs.stringify({ skip, take }))
}

/**
 * 删除好友请求
 * @param id 请求ID
 */
export function adminDelete(id: number) {
    return useAxios().axios.delete(base + "/" + id)
}

/**
 * 所有的好友请求
 */
export function list(skip: number = 0, take: number = 15) {
    return useAxios().axios.get(base + "/self/list?" + qs.stringify({ skip, take }))
}

/**
 * 请求添加好友
 * @param id 被请求的用户ID
 */
export function create(id: number) {
    return useAxios().axios.post(base + '/self/' + id);
}

/**
 * 删除好友请求
 * @param id 被删除的请求ID
 */
export function del(id: number) {
    return useAxios().axios.delete(base + '/self/' + id);
}

/**
 * 获取接收到的好友请求
 */
export function listReceiveReuqest(skip: number = 0, take: number = 15) {
    return useAxios().axios.get(base + '/self/receive?' + qs.stringify({ skip, take }))
}

/**
 * 同意添加为好友
 * @param id 请求ID
 * @param status 状态
 */
export function accept(id: number, status: Types.FriendRequestStatus) {
    return useAxios().axios.patch(base + '/self/' + id + "?" + qs.stringify({ status }))
}