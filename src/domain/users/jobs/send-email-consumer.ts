import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import type { SendEmailProps } from './send-email-type';

@Processor('sendMail-queue')
export class sendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('sendMail-job')
  async sendMailJob(job: Job<SendEmailProps>) {
    const { email, firstName } = job.data;
    await this.mailService.sendMail({
      to: email,
      from: 'Wellington',
      subject: 'Welcome',
      text: `You ${firstName} are welcome`,
    });
  }
  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`Completed: ${job.name}`);
  }

  @OnQueueProgress()
  onQueueProgress(job: Job) {
    console.log(`Job in progress: ${job.name}`);
  }
  @OnQueueActive()
  onQueueActive(job: Job) {
    console.log(`Queue active: ${job.name}`);
  }
}
