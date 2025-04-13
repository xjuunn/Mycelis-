import type { Types } from "@mycelis/database";
import type { PageResult, Result } from "@mycelis/types";

/**
 * 查询好友标签
 */
export function list() {
    return useAxios().axios.get<PageResult<Types.FriendshipTag>>('/friend-tag');
}

/**
 * 创建好友标签
 * @param tag 标签名
 * @param sort 排序
 */
export function create(tag: string, sort: number) {
    return useAxios().axios.post<Result<Types.FriendshipTag>>('/friend-tag', { tag, sort })
}

/**
 * 查询好友标签下的好友关系列表
 * @param id 好友标签ID
 */
export function listDetail(id: number) {
    return useAxios().axios.get<PageResult<Types.Friendship>>('/friend-tag/details/' + id)
}

/**
 * 更新好友标签信息
 * @param id 好友标签Id
 * @param tag 标签名
 * @param sort 排序
 */
export function update(id: number, tag: string, sort: number) {
    return useAxios().axios.patch<Result<Types.FriendshipTag & { friendship: Types.Friendship[] }>>('/friend-tag/' + id, { tag, sort })
}

/**
 * 删除好友标签
 * @param id 标签ID
 */
export function del(id: number) {
    return useAxios().axios.delete<Result<Types.FriendshipTag>>("/friend-tag/" + id);
}