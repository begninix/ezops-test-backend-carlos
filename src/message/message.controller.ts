import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessageDto } from 'src/dtos/MessageDto';
import { Message } from './message.schema';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  create(@Body() message: MessageDto): void {
    this.messageService.create(message);
  }

  @Get()
  findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.messageService.uploadFile(file);
  }
}
