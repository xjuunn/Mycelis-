import { Module } from '@nestjs/common';
import { AppinfoController } from './appinfo.controller';

@Module({
  controllers: [AppinfoController],
})
export class AppinfoModule {}
