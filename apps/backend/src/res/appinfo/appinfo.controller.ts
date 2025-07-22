import { Controller, Get, Query, } from '@nestjs/common';
import { promisify } from 'util';
import { exec } from 'child_process';
import { PageInfo } from 'src/d/pageinfo/pageinfo.decorator';
import { PageRequest } from '@mycelis/types';
const execAsync = promisify(exec);
@Controller('appinfo')
export class AppinfoController {

  @Get('gitlogs')
  async getGitLogs(@PageInfo() pageInfo: PageRequest = { skip: 0, take: 15 }) {
    if (pageInfo.skip === undefined) pageInfo.skip = 0;
    if (pageInfo.take === undefined) pageInfo.take = 15;
    try {
      // 使用自定义格式获取 Git 日志
      const { stdout } = await execAsync(
        `git log --pretty=format:"%h||||||%s||||||%b||||||%cN||||||%ce||||||%ar||||||%aI" --max-count=${pageInfo.take} --skip=${pageInfo.skip} --no-merges`
      );

      // 将日志按行分割
      const logLines = stdout.split('\n').filter(line => line.trim() !== '');

      // 解析每行日志为 JSON 对象
      const logs = logLines.map(line => {
        const [
          shortHash,
          title,
          body,
          committerName,
          committerEmail,
          relativeTime,
          committerDateISO,
        ] = line.split('||||||');

        return {
          shortHash,
          title,
          body: body.trim(),
          committer: {
            name: committerName,
            email: committerEmail,
            relativeTime: relativeTime,
            date: committerDateISO,
          },
        };
      });

      return { commits: logs };
    } catch (error) {
      throw new Error('Failed to fetch Git logs: ' + error.message);
    }
  }

  @Get('/gitinfo')
  async getGitInfo() {
    let name = '';
    let url = '';
    try {
      const { stdout } = await execAsync('git remote get-url origin');
      url = stdout.replace('.git', '').replace('\n', '');
      name = url.split('/').slice(-1)[0];
    } catch (error) {
      throw new Error('错误的执行git remote get-url origin：' + error.message);
    }
    return {
      name, url
    }

  }
}
