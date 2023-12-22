import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Notification } from './schema/notification-schema';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: mongoose.Model<Notification>,
  ) {}

  async createNewNotification(
    notificationDTO: NotificationDto,
  ): Promise<Notification> {
    const res = await this.notificationModel.create(notificationDTO);
    return res;
  }

  async getNotificationAll(): Promise<Notification[]> {
    const notifications = await this.notificationModel.find();
    return notifications;
  }
}
