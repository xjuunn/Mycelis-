import type { Types } from '@mycelis/database'
import type { PageRequest, PageResult, Result } from '@mycelis/types'
import qs from 'qs';

/**
 * 创建好友请求
 * @param receiverId 被请求者ID
 */
export function create(receiverId: number) {
    return useAxios().axios.post<Result<Types.FriendRequest & { receiver: Types.User }>>('/friend-request', { receiverId })
}

/**
 * 查询发送的好友请求
 * @param status 请求状态
 */
export function listSent(status: Types.FriendRequestStatus, pageInfo: PageRequest = { skip: 0, take: 15 }) {
    return useAxios().axios.get<PageResult<Types.FriendRequest & { receiver: Types.User }>>('/friend-request/sent?status=' + status + '&' + qs.stringify(pageInfo))
}

/**
 * 查询接收的好友请求
 * @param status 请求状态
 */
export function listReceived(status: Types.FriendRequestStatus, pageInfo: PageRequest = { skip: 0, take: 15 }) {
    return useAxios().axios.get<PageResult<Types.FriendRequest & { sender: Types.User }>>('/friend-request/received?status=' + status + '&' + qs.stringify(pageInfo))
}

/**
 * 查询好友请求
 * @param id 请求ID
 */
export function getOne(id: number) {
    return useAxios().axios.get<Result<Types.FriendRequest & { receiver: Types.User }>>('/friend-request/{id}/friend-request/' + id);
}

/**
 * 删除好友请求
 * @param id 请求ID
 */
export function del(id: number) {
    return useAxios().axios.delete<Result<Types.FriendRequest & { receiver: Types.User }>>('/friend-request/' + id);
}

/**
 * 接受好友请求
 * @param id 请求ID
 */
export function accept(id: number) {
    return useAxios().axios.patch<Result<Types.FriendRequest & { receiver: Types.User }>>('/friend-request/accept/' + id)
}

/**
 * 拒绝好友请求
 * @param id 请求ID
 */
export function reject(id: number) {
    return useAxios().axios.patch<Result<Types.FriendRequest & { receiver: Types.User }>>('/friend-request/reject/' + id);
}