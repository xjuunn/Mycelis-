import type { Model } from '@mycelis/types';
import { UserStatus } from '@mycelis/types/dist/esm/Enum';
import * as APPAPI from '~/api/file'
export type ChoicesResult<T = any> = {
    title: string;
    description?: string;
    prefixUI?: any;
    suffixUI?: any;
    data?: T;
}

export interface IArgs<T = any> {
    name: string; // 参数名称
    description: string; // 参数描述
    _value: T | undefined; // 当前值
    defaultValue?: T; // 默认值
    required?: boolean; // 是否必填
    setValue: (value: T) => void; // 设置值
    getValue: () => T | undefined; // 获取当前值
    choices?: (keyword: string) => Promise<ChoicesResult<T>[]>; // 可选值列表
    validate?: (value: T) => boolean; // 验证函数
    format?: (value: T) => string; // 格式化函数，将参数值转换为字符串
}

export abstract class BaseArg<T = any> implements IArgs<T> {
    name: string;
    description: string;
    _value: T | undefined;
    defaultValue?: T | undefined;
    required?: boolean | undefined;
    constructor(name: string, description: string, defaultValue?: T, required: boolean = true) {
        this.name = name;
        this.description = description;
        this.defaultValue = defaultValue;
        this._value = defaultValue;
        this.required = required;
    }
    setValue(value: T) {
        this._value = value;
    }

    getValue(): T | undefined {
        return this._value;
    }

    setRequired(required: boolean) {
        this.required = required;
        return this;
    }

    getRequired(): boolean | undefined {
        return this.required;
    }

    public abstract choices(keyword: string): Promise<ChoicesResult<T>[]>;

    public abstract validate(value: T): boolean;

}

export class UserArg extends BaseArg<Model.User> {

    constructor() { super('username', '用户名') }

    public override async choices(keyword: string): Promise<ChoicesResult<Model.User>[]> {
        const userSearch = await import('~/api/user')
        const { data } = await userSearch.search(keyword, 5, 0);
        const list: ChoicesResult[] = [];
        data.data.list.forEach(user => {
            list.push({
                title: user.displayName ? user.displayName : user.name,
                description: user.displayName ? `(${user.name})` : '',
                data: user,
                prefixUI: (
                    <div class={'avatar w-7 h-7 rounded-full overflow-hidden'}>
                        <img src={APPAPI.getFileUrl(user.avatarUrl ?? '')} />
                    </div>
                ),
                suffixUI: user.status === UserStatus.ONLINE ? <span class='text-success'>在线</span> : <span></span>
            })
        })

        return list;
    }

    public override validate(value: Model.User): boolean {
        if (!value) return false;
        return true;
    }
}

export class ThemeArg extends BaseArg<string> {

    constructor() { super('themename', '主题名') }

    public override async choices(keyword: string): Promise<ChoicesResult<string>[]> {
        const list: ChoicesResult<string>[] = [];
        useTheme().themeList.forEach(themeName => {
            if (themeName.startsWith(keyword))
                list.push({ title: themeName })
        })
        return list;
    }

    public override validate(value: string): boolean {
        return useTheme().themeList.includes(value)
    }

}
