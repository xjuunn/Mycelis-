import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Token, TokenInfo } from 'src/d/token-info/token-info';
import { PageInfo } from 'src/d/pageinfo/pageinfo.decorator';
import { PageRequest } from '@mycelis/types';
import { SearchMessageDto } from './dto/search-message.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/gu/auth/auth.guard';

@WebSocketGateway(8081)
export class MessageGateway {
  constructor(private readonly messageService: MessageService) { }

  @SubscribeMessage('test')
  test(@MessageBody() data: string) {
    return data + ' hello';
  }

  // @SubscribeMessage('createMessage')
  // create(@MessageBody() createMessageDto: string, @Token() tokenInfo: TokenInfo) {
  //   return this.messageService.create(JSON.parse(createMessageDto), tokenInfo.id);
  // }


  // @SubscribeMessage('updateMessage')
  // update(@MessageBody('id') id: string, @MessageBody() updateMessageDto: string, @Token() tokenInfo: TokenInfo) {
  //   return this.messageService.update(+id, JSON.parse(updateMessageDto), tokenInfo.id);
  // }

  // @SubscribeMessage('removeMessage')
  // remove(@MessageBody() id: string, @Token() tokenInfo: TokenInfo) {
  //   return this.messageService.remove(+id, tokenInfo.id);
  // }
}
