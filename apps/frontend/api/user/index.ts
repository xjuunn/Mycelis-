import { Enums, Model, PageRequest, PageResult, PageResultInfo, Result } from '@mycelis/types';
import qs from 'qs';

export * as Devices from './device';

/**
 * 用户注册
 * @param name 用户名
 * @param password 密码
 */
export function signUp(name: string, password: string, avatar: string = '') {
    return useAxios().axios.post<Result<Model.User>>('/auth/signUp', {
        name, password, avatar
    })
}

/**
 * 用户登录
 * @param name 用户名
 * @param password 密码
 */
export function signIn(name: string, password: string) {
    return useAxios().axios.post<Result<{ token: string, user: Model.User }>>('/auth/signIn', {
        name, password
    })
}

export function search(keyword: string, take: number = 15, skip: number = 0) {
    return useAxios().axios.get<Result<SearchResult>>(`/user/search?keyword=${keyword}&take=${take}&skip=${skip}`)
}

export function list(form: ListForm, pageInfo: PageRequest = new PageRequest()) {
    return useAxios().axios.post<PageResult<Model.User>>('/user?' + qs.stringify(pageInfo), form);
}

export function update(form: UpdateForm) {
    return useAxios().axios.patch<Result<Model.User>>('/user', form)
}

export function del() {
    return useAxios().axios.delete('/user')
}

export function find(id: number) {
    return useAxios().axios.get<Result<Model.User>>('/user/id/' + id);
}

export function findByName(name: string) {
    return useAxios().axios.get<Result<Model.User>>('/user/name/' + name);
}


export interface UpdateForm {
    name?: string;
    oldPassword?: string;
    newPassword?: string;
    displayName?: string;
    avatarUrl?: string;
    status?: Enums.UserStatus;
}

export interface ListForm {
    id?: number;
    name?: string;
    displayName?: string;
    avatarUrl?: string;
    status?: Enums.UserStatus;
    role?: Enums.UserRole;
    isActive?: boolean;
}

export interface SearchResult {
    list: Model.User[],
    total: number,
    take: number,
    skip: number
}

