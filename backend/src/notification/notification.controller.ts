import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { NotificationDto } from './dto/notification.dto';
import { NotificationService } from './notification.service';
import { Notification } from './schema/notification-schema';

@Controller('notifications')
export class NotificationController {
  // Notification service is automatically created when initializing the controller
  constructor(private notificationService: NotificationService) {}

  // some request from client
  // Post: .../notifications/create
  @Post('create') // create new notification
  async createNewNotification(
    @Body() notification: NotificationDto,
  ): Promise<Notification> {
    return this.notificationService.createNewNotification(notification);
  }

  // Get: .../notifications
  @Get()
  async getNotificationsAll(): Promise<Notification[]> {
    return this.notificationService.getNotificationAll();
  }
}
