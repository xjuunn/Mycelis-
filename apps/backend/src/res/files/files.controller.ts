import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/d/public/public.decorator';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('upload')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
  ) { }

  @ApiOperation({
    description:"图片文件上传",summary:"图片文件上传"
  })
  @ApiBody({
    schema:{
      type:"object",
      properties: {
        file:{type:"file",description:"图片文件",example:"test.png"}
      }
    }
  })
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

  @ApiOperation({
    description:"头像上传",summary:"头像上传"
  })
  @ApiBody({
    schema:{
      type:"object",
      properties: {
        file:{type:"file",description:"头像文件",example:"test.png"}
      }
    }
  })
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
