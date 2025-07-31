import { CommandRegister } from "./CommandRegister";
import type { BaseCommand, ICommand } from "./Commands";

export class CommandInputHelper {

    inputCommand: string = '';
    currentCommandName: string = '';
    currentCommand: BaseCommand | null = null;
    isCommandNameInputOver: boolean = false;

    public async setInputCommand(input: string) {
        this.inputCommand = input;
        this.currentCommandName = '';
        if (!input.includes(' ')) this.isCommandNameInputOver = false;
        else this.isCommandNameInputOver = true;
        try {
            this.currentCommandName = this.extractCommandName(input);
            if (this.currentCommand?.name === this.currentCommandName) {
                this.setArgs();
                return
            }
            this.currentCommand = await this.getCommand(this.currentCommandName);
            this.setArgs()
        } catch (e: any) {
            this.currentCommand = null;
            this.currentCommandName = ''
            return e.message + '';
        }
        return this;
    }

    public extractCommandName(input: string): string {
        const parts = input.trim().split(/\s+/);
        if (parts[0].startsWith('/')) {
            parts[0] = parts[0].slice(1);
        }
        return parts.length > 0 ? parts[0] : '';
    }

    public searchCommand(cmd: string = this.inputCommand): { name: string, description: string }[] {
        cmd = this.extractCommandName(cmd);
        const commandRegister = CommandRegister.getInstance();
        const commands: { name: string, description: string }[] = [];
        commandRegister.getCommandNames().forEach(({ name, description }) => {
            if (name.startsWith(cmd)) {
                commands.push({ name, description });
            }
        });
        return commands;
    }

    public async getCommand(name: string = this.currentCommandName): Promise<BaseCommand> {
        if (!name) throw new Error('命令名称不能为空');
        const commandRegister = CommandRegister.getInstance();
        try {
            return await commandRegister.getCommand(name);
        } catch (error) {
            throw error;
        }
    }

    getArgArr() {
        return this.inputCommand.split(' ').slice(1).filter(arg => arg !== '');
    }

    public setArgs() {
        const argarr = this.getArgArr();
        argarr.forEach((arg, index) => {
            if (this.currentCommand && this.currentCommand.args && index < this.currentCommand.args.length)
                this.currentCommand.args[index].setValue(arg);
        })
    }

    public async getLastArgChoices() {
        if (this.currentCommand && this.currentCommand.args) {
            let arg = this.currentCommand.args[this.currentCommand.args.length - 1]
            if (arg.choices) {
                const list = arg.choices(this.getArgArr().slice(-1)[0]);
                return list
            }
        }
    }
}