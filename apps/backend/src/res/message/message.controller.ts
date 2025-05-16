import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';
import { Token, TokenInfo } from 'src/d/token-info/token-info';
import { SearchMessageDto } from './dto/search-message.dto';
import { PageInfo } from 'src/d/pageinfo/pageinfo.decorator';
import { PageRequest } from '@mycelis/types';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @ApiOperation({ summary: '创建消息' })
  @Post('/create')
  create(
    @Body() createMessageDto: CreateMessageDto,
    @Token() tokenInfo: TokenInfo,
  ) {
    return this.messageService.create(createMessageDto, tokenInfo.id);
  }

  @ApiOperation({ summary: '获取发送的消息列表' })
  @Post('/sentlist')
  findSentMessageList(
    @Body() searchMessageDto: SearchMessageDto,
    @Token() tokenInfo: TokenInfo,
    @PageInfo() pageInfo: PageRequest,
  ) {
    return this.messageService.findSentMessageList(
      searchMessageDto,
      tokenInfo.id,
      pageInfo,
    );
  }

  @ApiOperation({ summary: "获取消息好友列表" })
  @Get("/friendlist")
  getFriendList(@Token() tokenInfo: TokenInfo, @PageInfo() pageInfo: PageRequest) {
    return this.messageService.getFriendList(tokenInfo.id, pageInfo)
  }

  @ApiOperation({ summary: '获取接收的消息列表' })
  @Post('/receivedlist')
  findReceivedMessageList(
    @Body() searchMessageDto: SearchMessageDto,
    @Token() tokenInfo: TokenInfo,
    @PageInfo() pageInfo: PageRequest,
  ) {
    return this.messageService.findReceivedMessageList(
      searchMessageDto,
      tokenInfo.id,
      pageInfo,
    );
  }

  @ApiOperation({ summary: "获取和某人的消息列表" })
  @Post('/listbyfriend')
  findMessageListByFriend(
    @Body() searchMessageDto: SearchMessageDto,
    @Token() tokienInfo: TokenInfo,
    @PageInfo() pageInfo: PageRequest) {
    return this.messageService.listByFriend(searchMessageDto, tokienInfo.id, pageInfo);
  }

  @ApiOperation({ summary: '获取单条消息记录' })
  @Get('/find/:id')
  findOne(@Param('id') id: string, @Token() tokenInfo: TokenInfo) {
    return this.messageService.findOne(+id, tokenInfo.id);
  }

  @ApiOperation({ summary: '更新消息' })
  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateMessage: UpdateMessageDto,
    @Token() tokenInfo: TokenInfo,
  ) {
    return this.messageService.update(+id, updateMessage, tokenInfo.id);
  }

  @ApiOperation({ summary: '删除消息' })
  @Delete('/:id')
  remove(@Param('id') id: string, @Token() tokenInfo: TokenInfo) {
    return this.messageService.remove(+id, tokenInfo.id);
  }
}
