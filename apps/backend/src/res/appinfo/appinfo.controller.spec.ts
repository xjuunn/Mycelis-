import { Test, TestingModule } from '@nestjs/testing';
import { AppinfoController } from './appinfo.controller';
import { AppinfoService } from './appinfo.service';

describe('AppinfoController', () => {
  let controller: AppinfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppinfoController],
      providers: [AppinfoService],
    }).compile();

    controller = module.get<AppinfoController>(AppinfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
