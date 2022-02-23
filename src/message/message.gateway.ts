import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Message } from './message.schema';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  messages: Message[] = [];

  private logger: Logger = new Logger('MessageGateway');

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: Message): void {
    this.messages.push(message);
    console.log(message);
    this.server.emit('message', message);
  }

  afterInit() {
    this.logger.log(`Socket.io started`);
  }
  handleConnection(client: any) {
    this.logger.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
