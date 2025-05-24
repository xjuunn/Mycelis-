import type { Types } from "@mycelis/database";
import type { PageRequest, PageResult, Result } from "@mycelis/types";
import qs from 'qs';

// 删除用户设备
export function del(id: number) {
    return useAxios().axios.delete<Result<Types.UserDevice>>('/socket-client/' + id);
}

// 更新设备名称
export function updateName(id: number, name: string) {
    return useAxios().axios.patch<Result<Types.UserDevice>>('/socket-client/' + id + '?name=' + name);
}

// 获取用户设备列表
export function list(pageInfo: PageRequest) {
    return useAxios().axios.get<PageResult<Types.UserDevice>>('/socket-client?' + qs.stringify(pageInfo))
}

// 获取用户设备
export function getDevice(id: number) {
    return useAxios().axios.get<Result<Types.UserDevice>>('/socket-client' + id);
}