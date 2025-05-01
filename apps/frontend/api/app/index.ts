import type { Types } from "@mycelis/database";
import { Result } from '@mycelis/types';

// 检查服务器连通性和延迟
export async function checkConnect() {
    let time1 = Date.now();
    let { data } = await useAxios().axios.get<Result<string>>('/checkConnect');
    if (data.code !== 200) throw new Error('无法连接服务器');
    let time2 = Date.now();
    return {
        delay: Math.floor((time2 - time1) / 2),
        data
    };
}

// 检查客户端登录状态
export function checkLogin() {
    return useAxios().axios.get<Result<Types.User>>('/checkLogin');
}
