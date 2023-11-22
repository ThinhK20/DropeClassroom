import { Controller, Post, Query } from '@nestjs/common';
import { MailDataRequired } from '@sendgrid/mail';
import { SendgridService } from 'src/sendgrid/sendgrid.service';

@Controller('mail')
export class MailController {
  constructor(private readonly sendgridService: SendgridService) {}

  @Post('send-email')
  async sendEmail(@Query('email') email) {
    const mail: MailDataRequired = {
      to: email,
      subject: 'Hello from Sendgrid',
      from: 'thinhnguyent.2002@gmail.com', // should not change
      text: 'Hi! I dunno who you are but welcome to my world',
      html: '<h1>Hello</h1>',
    };
    return await this.sendgridService.sendEmail(mail);
  }
}
