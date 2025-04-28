import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { MessageService } from './message.service';

@WebSocketGateway({ cors: true })
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}
  
}
