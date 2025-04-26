import { InternalServerErrorException } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';

export async function getFileUrl() {
  const FILE_URL = process.env.FILE_URL ?? './files';
  if (FILE_URL === '')
    throw new InternalServerErrorException('服务器环境变量FILE_URL为空');
  if (FILE_URL.startsWith('/')) return FILE_URL;
  if (FILE_URL.includes(':')) return FILE_URL;
  const fullPath = join(__dirname, '../../../../', FILE_URL);
  try {
    await fs.access(fullPath).catch(async () => {
      await fs.mkdir(fullPath, { recursive: true });
    });
  } catch (err) {
    throw new InternalServerErrorException(`无法创建目录: ${fullPath}`);
  }
  return fullPath;
}
