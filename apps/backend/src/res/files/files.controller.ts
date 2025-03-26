import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
  ) { }

  @Post('uploadimg')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 20 * 1024 * 1024  }),
      new FileTypeValidator({
        fileType: /^image\/(jpeg|png|gif|webp)$/
      })
    ]
  })) file: Express.Multer.File) {
    return this.filesService.saveFile(file);
  }

}
