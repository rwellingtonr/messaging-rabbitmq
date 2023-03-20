import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

export type SendEmailProps = {
  email: string;
  firstName: string;
};

@Injectable()
export class SendEmail {
  constructor(private readonly mailService: MailerService) {}

  async execute({ email, firstName }: SendEmailProps) {
    console.log('Sending email...');

    await this.mailService.sendMail({
      to: email,
      from: 'Wellington',
      subject: 'Welcome',
      text: `You ${firstName} are welcome`,
    });
    console.log('Email sent!');
  }
}
