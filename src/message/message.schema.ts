import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  message: string;

  @Prop({ required: false })
  file: string;

  @Prop({ required: false })
  fileName: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
