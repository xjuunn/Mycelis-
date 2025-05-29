import { execaCommand } from 'execa';

export type Task = {
    /** 任务名称 */
    name?: string;
    /** 操作路径 */
    cwd?: string;
    /** 执行命令 */
    cmd: string;
}

/**
 * 并行执行
 * @param tasks 任务列表
 */
export async function runParallel(tasks: Array<Task>) {
    return Promise.all(
        tasks.map(task =>
            execaCommand(task.cmd, {
                cwd: task.cwd,
                stdio: 'inherit',
                shell: true
            })
        )
    )
}

/**
 * 分步执行
 * @param steps 步骤
 */
export async function runSteps(steps: Array<Task>) {
    for (const step of steps) {
        await execaCommand(step.cmd, { stdio: 'inherit', shell: true, cwd: step.cwd })
    }
}