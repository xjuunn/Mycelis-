import type { BaseCommand, ICommand } from "./Commands";

type CommandLoader = () => Promise<BaseCommand>;

export class CommandRegister {
    private static instance: CommandRegister;
    private commandLoaders: Map<string, { loader: CommandLoader, description: string }> = new Map();
    private commands: Map<string, BaseCommand> = new Map();

    constructor() {
        if (CommandRegister.instance) {
            return CommandRegister.instance;
        }
        CommandRegister.instance = this;
        // 动态导入注册命令
        this.registerLazy('call', () => import('./Commands').then(m => new m.CallCommand()), '向指定用户打电话');
        this.registerLazy('theme', () => import('./Commands').then(m => new m.ThemeCommand()), '修改系统主题');
    }

    static getInstance(): CommandRegister {
        if (!CommandRegister.instance) {
            CommandRegister.instance = new CommandRegister();
        }
        return CommandRegister.instance;
    }

    registerLazy(name: string, loader: CommandLoader, description: string): void {
        this.commandLoaders.set(name, { loader, description });
    }

    async getCommand(name: string): Promise<BaseCommand> {
        if (this.commands.has(name)) {
            const command = this.commands.get(name);
            if (command) return command;
        }
        const loader = this.commandLoaders.get(name)?.loader;
        if (loader) {
            try {
                const command = await loader();
                this.commands.set(name, command);
                return command;
            } catch (error) {
                console.log(`加载命令${name}失败`, error);
                throw new Error(`加载命令${name}失败: ${error instanceof Error ? error.message : '未知错误'}`);
            }
        }
        throw new Error(`命令${name}未注册`);
    }

    public getCommandNames(): { name: string, description: string }[] {
        const commandInfos = Array.from(this.commandLoaders.entries()).map(([name, { description }]) => ({
            name,
            description
        }));
        return commandInfos;
    }
}