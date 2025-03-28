
import type { Types } from '@mycelis/database';
import { Result } from '@mycelis/types';
// let { axios } = useAxios();
/**
 * 用户注册
 * @param name 用户名
 * @param password 密码
 */
export function signUp(name: string, password: string, avatar: string = '') {
    return useAxios().axios.post<Result<Types.User>>('/auth/signUp', {
        name, password, avatar
    })
}

/**
 * 用户登录
 * @param name 用户名
 * @param password 密码
 */
export function signIn(name: string, password: string) {
    return useAxios().axios.post<Result<{ token: string, user: Types.User }>>('/auth/signIn', {
        name, password
    })
}
