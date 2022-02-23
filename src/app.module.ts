import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from './message/message.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:dh15yl6yIHw48x69@imessage.ghtkh.mongodb.net/app?retryWrites=true&w=majority',
    ),
    MessageModule,
  ],
})
export class AppModule {}
