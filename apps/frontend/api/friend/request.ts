import type { Model, PageRequest, PageResult, Result, Enums } from '@mycelis/types'
import qs from 'qs';

/**
 * 创建好友请求
 * @param receiverId 被请求者ID
 */
export function create(receiverId: number) {
    return useAxios().axios.post<Result<Model.FriendRequest & { receiver: Model.User }>>('/friend-request', { receiverId })
}

/**
 * 查询发送的好友请求
 * @param status 请求状态
 */
export function listSent(status: Enums.FriendRequestStatus, pageInfo: PageRequest = { skip: 0, take: 15 }) {
    return useAxios().axios.get<PageResult<Model.FriendRequest & { receiver: Model.User }>>('/friend-request/sent?status=' + status + '&' + qs.stringify(pageInfo))
}

/**
 * 查询接收的好友请求
 * @param status 请求状态
 */
export function listReceived(status: Enums.FriendRequestStatus, pageInfo: PageRequest = { skip: 0, take: 15 }) {
    return useAxios().axios.get<PageResult<Model.FriendRequest & { sender: Model.User }>>('/friend-request/received?status=' + status + '&' + qs.stringify(pageInfo))
}

/**
 * 查询好友请求
 * @param id 请求ID
 */
export function getOne(id: number) {
    return useAxios().axios.get<Result<Model.FriendRequest & { receiver: Model.User }>>('/friend-request/{id}/friend-request/' + id);
}

/**
 * 删除好友请求
 * @param id 请求ID
 */
export function del(id: number) {
    return useAxios().axios.delete<Result<Model.FriendRequest & { receiver: Model.User }>>('/friend-request/' + id);
}

/**
 * 接受好友请求
 * @param id 请求ID
 */
export function accept(id: number) {
    return useAxios().axios.patch<Result<Model.FriendRequest & { receiver: Model.User }>>('/friend-request/accept/' + id)
}

/**
 * 拒绝好友请求
 * @param id 请求ID
 */
export function reject(id: number) {
    return useAxios().axios.patch<Result<Model.FriendRequest & { receiver: Model.User }>>('/friend-request/reject/' + id);
}