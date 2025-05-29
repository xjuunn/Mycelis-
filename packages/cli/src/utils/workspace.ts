import fspromise from 'fs/promises'
import path, { join } from 'path'
import fs from 'fs';


interface PackageInfo {
    name: string
    path: string
    private?: boolean
}

export async function getMonorepoPackages(): Promise<PackageInfo[]> {
    const packages: PackageInfo[] = []

    for (const dir of ['packages', 'apps']) {
        const fullPath = path.join(findMonorepoRoot(), dir)
        try {
            const subDirs = await fspromise.readdir(fullPath)
            for (const pkgDir of subDirs) {
                const pkgPath = path.join(fullPath, pkgDir)
                const pkgJsonPath = path.join(pkgPath, 'package.json')

                try {
                    const pkgJson = JSON.parse(await fspromise.readFile(pkgJsonPath, 'utf-8'))
                    packages.push({
                        name: pkgJson.name,
                        path: pkgPath,
                        private: pkgJson.private
                    })
                } catch { }
            }
        } catch { }
    }

    return packages
}


/**
 * 向上查找包含特殊文件的目录作为 Monorepo 根目录
 * @param startDir 可选，默认是当前文件所在目录
 * @returns 根目录路径
 */
export function findMonorepoRoot(startDir: string = __dirname): string {
    let dir = path.resolve(startDir);
    const isMonorepoRoot = (dirPath: string) => {
        const files = fs.readdirSync(dirPath);
        return (
            files.includes('pnpm-workspace.yaml') ||
            files.includes('turbo.json') ||
            (files.includes('package.json') &&
                (() => {
                    try {
                        const pkg = JSON.parse(fs.readFileSync(path.join(dirPath, 'package.json'), 'utf-8'));
                        return pkg.workspaces !== undefined;
                    } catch {
                        return false;
                    }
                })()
            ) ||
            files.includes('.git')
        );
    };
    while (true) {
        if (isMonorepoRoot(dir)) {
            return dir;
        }
        const parentDir = path.dirname(dir);
        if (parentDir === dir) break;

        dir = parentDir;
    }
    throw new Error('未找到 Monorepo 根目录');
}
