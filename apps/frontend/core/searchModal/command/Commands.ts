import { UserArg, type IArgs } from "./Args";

export interface ICommand {
    // 命令名称
    name: string;
    // 命令描述
    description: string;
    // 命令用法
    usage: string;

    args?: IArgs[];
}

export abstract class BaseCommand implements ICommand {
    name: string;
    description: string;
    usage: string;
    args?: IArgs<any>[] | undefined;
    constructor(name: string, description: string, usage: string) {
        this.name = name;
        this.description = description;
        this.usage = usage;
    }

    addArg(arg: IArgs<any>) {
        if (!this.args) this.args = [];
        this.args.push(arg);
        return this;
    }

    argNum(): number {
        return this.args ? this.args.length : 0;
    }

}

export class CallCommand extends BaseCommand {
    constructor() {
        super('call', '向某人打电话', 'call <username>');
        this.addArg(new UserArg())

    }


}