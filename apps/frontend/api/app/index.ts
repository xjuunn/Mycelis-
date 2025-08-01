import { Result } from '@mycelis/types';
import type { Model } from '@mycelis/types';
export * as Info from './info';
// 检查服务器连通性和延迟
export async function checkConnect() {
    let time1 = Date.now();
    let { data } = await useAxios().axios.get<Result<string>>('/checkConnect');
    if (data.code !== 200) throw new Error('无法连接服务器');
    let time2 = Date.now();
    return new Result({ ...data, delay: Math.floor((time2 - time1) / 2) }, 200, 'ok')
}

// 检查客户端登录状态
export function checkLogin() {
    return useAxios().axios.get<Result<Model.User>>('/checkLogin');
}

