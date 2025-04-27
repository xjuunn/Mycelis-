import { Controller, Delete, Get, Param } from '@nestjs/common';
import { SocketClientService } from './socket-client.service';
import { Token, TokenInfo } from '../../d/token-info/token-info';
import { PageInfo } from '../../d/pageinfo/pageinfo.decorator';
import { PageRequest } from '@mycelis/types';
import { ApiOperation } from '@nestjs/swagger';

@Controller('socket-client')
export class SocketClientController {
  constructor(private readonly socketClientService: SocketClientService) {}

  @ApiOperation({ summary: '移除设备' })
  @Delete(':id')
  removeDevice(@Param('id') id: string, @Token() tokenInfo: TokenInfo) {
    return this.socketClientService.removeDevice(+id, tokenInfo.id);
  }

  @ApiOperation({ summary: '获取当前用户设备列表' })
  @Get()
  findDevices(
    @Token() tokenInfo: TokenInfo,
    @PageInfo() pageInfo: PageRequest,
  ) {
    return this.socketClientService.findDevices(tokenInfo.id, pageInfo);
  }

  @ApiOperation({ summary: '获取设备' })
  @Get(':id')
  findOneDevice(
    @Param('id') id: string,
    deviceId: number,
    @Token() tokenInfo: TokenInfo,
  ) {
    return this.socketClientService.findOneDevice(+id, tokenInfo.id);
  }
}
