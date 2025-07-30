import { UserArg, type IArgs } from "./Args";
type ExtractArgNames<Usage extends string> =
    Usage extends `${string}<${infer ArgName}>${infer Rest}`
    ? ArgName | ExtractArgNames<Rest>
    : never;
type CommandExecuteResult = {
    success: boolean;
    message: string;
    data?: any;
}

export interface ICommand {
    // 命令名称
    name: string;
    // 命令描述
    description: string;
    // 命令用法
    usage: string;
    // 用户输入的完整命令字符串
    userInput: string;
    // 参数列表
    args?: IArgs[];
}

export abstract class BaseCommand<Usage extends string = any> implements ICommand {
    name: string;
    description: string;
    usage: Usage;
    userInput: string = '';
    args?: IArgs<any>[] | undefined;
    constructor(name: string, description: string, usage: Usage) {
        this.name = name;
        this.description = description;
        this.usage = usage;
    }

    // 为命令添加参数
    protected addArg(arg: IArgs<any>) {
        if (!this.args) this.args = [];
        this.args.push(arg);
        return this;
    }

    // 获取参数数量
    public argNum(): number {
        return this.args ? this.args.length : 0;
    }

    // 设置用户输入的命令字符串
    public setUserInput(command: string) {
        this.userInput = command;
        this.parseArgs(command);
        return this;
    }

    // 获取用户输入的命令字符串
    public getUserInput(): string {
        return this.userInput;
    }

    // 获取指定名称的参数
    public getArg(name: ExtractArgNames<Usage>): IArgs<any> | undefined {
        if (!this.args) return undefined;
        return this.args.find(arg => arg.name === name);
    }

    // 获取所有参数
    public getArgs(): IArgs<any>[] {
        return this.args || [];
    }

    // 解析用户输入的命令字符串
    parseArgs(input: string): void {
        const parts = input.split(' ');
        this.userInput = parts[0]; // 第一个部分是命令名称
        parts.slice(1).forEach((part, index) => {
            if (this.args && index < this.args.length) {
                this.args[index].setValue(part);
            }
        });
    }

    // 验证参数
    validateArgs(): boolean {
        if (!this.args) return true;
        return this.args.every(arg => arg.validate ? arg.validate(arg.getValue()) : true);
    }

    // 执行命令
    public abstract execute(): Promise<CommandExecuteResult> | CommandExecuteResult;

}

export class CallCommand extends BaseCommand<'call <username>'> {
    constructor() {
        super('call', '向某人打电话', 'call <username>');
        this.addArg(new UserArg())
    }

    public override execute(): Promise<CommandExecuteResult> | CommandExecuteResult {
        return {
            success: true,
            message: `成功向${this.getArg('username')?.getValue()}打电话`,
        };
    }


}