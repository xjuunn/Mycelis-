import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/d/public/public.decorator';

@Controller('upload')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
  ) { }

  @Public()
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 20 * 1024 * 1024 }),
      new FileTypeValidator({
        fileType: /^image\/(jpeg|png|gif|webp)$/
      })
    ]
  })) file: Express.Multer.File) {
    return this.filesService.saveFile(file);
  }

  @Public()
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 20 * 1024 * 1024 }),
      new FileTypeValidator({
        fileType: /^image\/(jpeg|png|gif|webp)$/
      })
    ]
  })) file: Express.Multer.File) {
    return this.filesService.saveFile(file, 'avatars');
  }

}
