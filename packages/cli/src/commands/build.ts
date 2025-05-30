import { logger } from '../utils/logger';
import { findMonorepoRoot } from '../utils/workspace';
import { runSteps } from '../utils/exec';

export async function buildCommand(cli: any) {
    cli
        .command('build', '构建包')
        .option('-n, --name <name>', '指定包名，多个包名使用`,`分隔', { default: 'all' })
        .option('-a, --apps', '选中所有apps中的包', { default: false })
        .option('-p, --packages', '选中所有packages中的包', { default: false })
        .action(async (options: { name: string, apps: boolean, packages: boolean }) => {
            let pkgNameList = [];
            if (options.name === 'all' && !options.apps && !options.packages) {
                logger.info("正在构建所有的包...")
                await runSteps([{ name: "构建所有的包", cmd: `npx turbo run build`, cwd: findMonorepoRoot() }]);
                return;
            } else pkgNameList.push(...(options.name.split(' ')));
            if (options.apps) pkgNameList.push('\"./apps/*\"');
            if (options.packages) pkgNameList.push('\"./packages/*\"');
            pkgNameList = pkgNameList.filter(item => item !== 'all')
                .map(item => item.includes('/') ? item : '@mycelis/' + item); // 拼接命名空间
            const cmd = `npx turbo run build ${'--filter ' + pkgNameList.join(' --filter ')}`;
            logger.info("正在构建包: " + pkgNameList.join(','));
            logger.info("运行命令：" + cmd)
            await runSteps([{ name: "构建指定的package", cmd, cwd: findMonorepoRoot() }])
            logger.success('构建完成!')
        })
}