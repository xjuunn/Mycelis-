import { logger } from '../utils/logger';
import { findMonorepoRoot } from '../utils/workspace';
import { runSteps } from '../utils/exec';

export async function startCommand(cli: any) {
    cli
        .command('start', '运行')
        .option('-n, --name <name>', '指定包名，多个包名使用`,`分隔', { default: 'all' })
        .option('-f, --frontend', '选中前端', { default: false })
        .option('-b, --backend', '选中后端', { default: false })
        .action(async (options: { name: string, frontend: boolean, backend: boolean }) => {
            let pkgNameList = [];
            if (options.name === 'all' && !options.frontend && !options.backend) {
                logger.info("正在运行所有的包...")
                await runSteps([{ name: "运行所有的包", cmd: `npx turbo run start`, cwd: findMonorepoRoot() }]);
                return;
            } else pkgNameList.push(...(options.name.split(' ')));
            if (options.frontend) pkgNameList.push('@mycelis/frontend');
            if (options.backend) pkgNameList.push('@mycelis/backend');
            pkgNameList = pkgNameList.filter(item => item !== 'all')
                .map(item => item.includes('/') ? item : '@mycelis/' + item); // 拼接命名空间
            const cmd = `npx turbo run start ${'--filter ' + pkgNameList.join(' --filter ')}`;
            logger.info("正在运行包: " + pkgNameList.join(','));
            logger.info("运行命令：" + cmd)
            await runSteps([{ name: "运行指定的package", cmd, cwd: findMonorepoRoot() }])
            logger.success('运行结束!')
        })
}