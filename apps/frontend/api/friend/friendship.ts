import { Model, PageRequest, type PageResult, type Result } from "@mycelis/types";
import qs from 'qs';

/**
 * 更新好友关系标签信息
 * @param id 标签ID
 * @param tag 标签名
 * @param sort 排序
 */
export function updateTag(id: number, tag: string, sort: number = 0) {
    return useAxios().axios.patch<Result<Model.Friendship & { friend: Model.User, tag?: Model.FriendshipTag }>>(`/friendship/${id}/tag`, { tag, sort })
}

/**
 * 删除好友关系标签
 * @param id 标签ID
 */
export function delTag(id: number) {
    return useAxios().axios.patch<Result<Model.Friendship & { friend: Model.User, tag?: Model.FriendshipTag }>>(`/friendship/${id}/tag`)
}

/**
 * 查询好友关系列表
 * @param form 查询表单
 * @param pageInfo 分页
 */
export function list(form: ListForm, pageInfo: PageRequest) {
    return useAxios().axios.post<PageResult<Model.Friendship & { friend: Model.User, tag?: Model.FriendshipTag }>>('/friendship?' + qs.stringify(pageInfo), {
        ...form
    })
}

export interface ListForm {
    id?: number;
    userId?: number;
    friendId?: number;
    note?: string;
    createAt?: number;
}

/**
 * 查询好友关系
 * @param id 好友关系ID
 */
export function getOne(id: number) {
    return useAxios().axios.get<Result<Model.Friendship & { friend: Model.User, tag?: Model.FriendshipTag }>>('/friendship/' + id);
}

/**
 * 删除好友关系
 * @param id 好友关系ID
 */
export function del(id: number) {
    return useAxios().axios.delete<Result<Model.Friendship & { friend: Model.User, tag?: Model.FriendshipTag }>>("/friendship/" + id);
}

/** 当好友状态发生改变 */
export function onFriendStatusChange(listener: (status: { userId: number, isOnline: boolean, time: Date }) => void) {
    const handler = (status: { userId: number, isOnline: boolean, time: Date }) => {
        listener(status);
    }
    useSocket()?.socket?.on('user:online', handler)
    onUnmounted(() => useSocket()?.socket?.off('user:online', handler));
}