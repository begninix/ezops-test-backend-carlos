import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './message.schema';
import { MessageDto } from 'src/dtos/MessageDto';
import { MessageGateway } from './message.gateway';
import { S3 } from 'aws-sdk';
import { Logger, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
    private messageGateway: MessageGateway,
  ) {}

  async create(message: MessageDto): Promise<void> {
    const createdMessage = new this.messageModel(message);
    this.messageGateway.handleMessage(createdMessage);
    await createdMessage.save();
  }

  async findAll(): Promise<Message[]> {
    return await this.messageModel.find().exec();
  }

  async uploadFile(file) {
    const s3 = this.getS3();
    const params = {
      Bucket: 'imessage',
      Key: file.originalname,
      Body: file.buffer,
      region: 'sa-east-1',
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        const s3url = s3.getSignedUrl('getObject', {
          Key: file.originalname,
          Bucket: 'imessage',
        });
        const response = [s3url, file.originalname];
        resolve(response);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }
}
