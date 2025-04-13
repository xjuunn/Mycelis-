
import type { Types } from '@mycelis/database';
import { PageRequest, PageResult, PageResultInfo, Result } from '@mycelis/types';
import qs from 'qs';
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

export function search(keyword: string, take: number = 15, skip: number = 0) {
    return useAxios().axios.get<Result<SearchResult>>(`/user/search?keyword=${keyword}&take=${take}&skip=${skip}`)
}

export function list(form: ListForm, pageInfo: PageRequest = new PageRequest()) {
    return useAxios().axios.post<PageResult<Types.User>>('/user?' + qs.stringify(pageInfo), form);
}

export function update(form: UpdateForm) {
    return useAxios().axios.patch<Result<Types.User>>('/user', form)
}

export function del() {
    return useAxios().axios.delete('/user')
}

export function find(id: number) {
    return useAxios().axios.get('/user/' + id);
}

export interface UpdateForm {
    name: string;
    passwordHash: string;
    displayName: string;
    avatarUrl: string;
    status: Types.UserStatus;
}

export interface ListForm {
    id?: number;
    name?: string;
    displayName?: string;
    avatarUrl?: string;
    status?: Types.UserStatus;
    role?: Types.UserRole;
    isActive?: boolean;
}

export interface SearchResult {
    list: Types.User[],
    total: number,
    take: number,
    skip: number
}

