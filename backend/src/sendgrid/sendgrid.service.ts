import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { renewPasswordMail } from './mail-templates/renew-password.template';
@Injectable()
export class SendgridService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SENDGRID_KEY'));
  }

  async sendEmail(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    // avoid this on production. use log instead :)
    return transport;
  }

  async sendRenewPasswordEmail(userEmail: string, renewPasswordLink: string) {
    const transportMail = renewPasswordMail(userEmail, renewPasswordLink);
    const transport = await SendGrid.send(transportMail);
    return transport;
  }
}
