import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { join } from 'path';
import { getFileUrl } from 'src/utils/FileUrl';
import { promises as fs } from 'fs';

@Injectable()
export class FilesService {

    async saveFile(file: Express.Multer.File, divname: string = 'images'): Promise<string> {
        const filename = Date.now() + '-' + file.originalname;
        let fileurl = join(await getFileUrl(), divname);
        try {
            await fs.access(fileurl).catch(async () => {
                await fs.mkdir(fileurl, { recursive: true });
            });
        } catch (err) {
            throw new InternalServerErrorException(`无法创建目录: ${fileurl}`);
        }
        await fs.writeFile(join(fileurl, filename), file.buffer);
        return `/${divname}/` + filename;
    }
}
