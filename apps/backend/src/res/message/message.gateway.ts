import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { MessageService } from './message.service';

@WebSocketGateway({ cors: true })
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('test')
  test(@MessageBody() data: string) {
    console.log(data, 1);
    return JSON.stringify(data) + ' hello';
  }
}
