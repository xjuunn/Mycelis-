
export interface IArgs<T = any> {
    name: string; // 参数名称
    description: string; // 参数描述
    _value: T | undefined; // 当前值
    defaultValue?: T; // 默认值
    required?: boolean; // 是否必填
    setValue: (value: T) => void; // 设置值
    getValue: () => T | undefined; // 获取当前值
    choices?: () => T[]; // 可选值列表
    validate?: (value: T) => boolean; // 验证函数
    format?: (value: T) => string; // 格式化函数，将参数值转换为字符串
}

export class UserArg implements IArgs<string> {
    _value: string | undefined;
    defaultValue?: string | undefined;
    name: string = 'user';
    description: string = '用户名';
    required = true;

    format?: ((value: string) => string) | undefined = () => {
        return this._value || '';
    };

    setValue: (value: string) => void = (value: string) => {
        this._value = value;
    };

    getValue: () => string | undefined = () => {
        return this._value;
    };

    validate?: ((value: string) => boolean) | undefined = (value: string) => {
        if (!value) return false;
        return true;
    };

    choices?: (() => string[]) | undefined = () => {
        return ['user01', 'user02', 'user03'];
    };
}