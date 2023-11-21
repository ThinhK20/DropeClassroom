import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
@Injectable()
export class SendgridService {
  constructor(private readonly configService: ConfigService) {
    console.log(
      'Sendgrid key: ',
      this.configService.get<string>('SENDGRID_KEY'),
    );
    SendGrid.setApiKey(this.configService.get<string>('SENDGRID_KEY'));
  }

  async sendEmail(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    // avoid this on production. use log instead :)
    console.log(`Email sent to ${mail.to}`);
    return transport;
  }
}
