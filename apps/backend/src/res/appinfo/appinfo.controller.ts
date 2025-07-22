import { Body, Controller, Get, Post, Query, } from '@nestjs/common';
import { promisify } from 'util';
import { exec } from 'child_process';
import { PageInfo } from 'src/d/pageinfo/pageinfo.decorator';
import { PageRequest } from '@mycelis/types';
import { ApiOperation } from '@nestjs/swagger';
import { ContributeHeatmapDTO } from './dto/ContributeHeatmapDTO';
const execAsync = promisify(exec);
@Controller('appinfo')
export class AppinfoController {

  @ApiOperation({ summary: "分页获取git的提交记录" })
  @Get('gitlogs')
  async getGitLogs(@PageInfo() pageInfo: PageRequest = { skip: 0, take: 15 }) {
    if (pageInfo.skip === undefined) pageInfo.skip = 0;
    if (pageInfo.take === undefined) pageInfo.take = 15;
    try {
      // 使用自定义格式获取 Git 日志
      const { stdout } = await execAsync(
        `git log --pretty=format:"%h||||||%s||||||%cN||||||%ce||||||%ar||||||%aI||||||%b++++ " --max-count=${pageInfo.take} --skip=${pageInfo.skip} --no-merges`
      );
      // 将日志按行分割
      const logLines = stdout.split('++++').filter(line => line.trim() !== '');
      // 解析每行日志为 JSON 对象
      const logs = logLines.map(line => {
        let [
          shortHash,
          title,
          committerName,
          committerEmail,
          relativeTime,
          committerDateISO,
          body,
        ] = line.split('||||||');

        return {
          shortHash: shortHash.replace('\n', '').trim(),
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

  @ApiOperation({ summary: "获取git仓库信息" })
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

  @ApiOperation({ summary: "获取贡献热力图数据" })
  @Post('/contributeHeatmap')
  async contributeHeatmap(@Body() contributeHeatmapDTO: ContributeHeatmapDTO) {
    let cmd = 'git log --pretty=format:"%ad" --date=short';
    if (contributeHeatmapDTO.start) cmd += ` --since="${contributeHeatmapDTO.start}"`;
    if (contributeHeatmapDTO.end) cmd += ` --until="${contributeHeatmapDTO.end}"`;
    if (contributeHeatmapDTO.author) cmd += ` --author="${contributeHeatmapDTO.author}"`;
    const commitsByDate: Record<string, number> = {};
    try {
      const { stdout } = await execAsync(cmd)
      stdout.split('\n').forEach(date => {
        commitsByDate[date] = (commitsByDate[date] || 0) + 1;
      })
    } catch (error) {
      throw new Error(`获取贡献热力图数据，执行:${cmd}失败！${error.message}`);
    }
    return Object.entries(commitsByDate).map(([date, count]) => ({
      date,
      count,
    }));
  }
}