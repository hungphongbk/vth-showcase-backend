import { Injectable } from '@nestjs/common';
import { MailerService } from '@app/mailer';
import { ShowcaseDto, ShowcaseStatus } from '../showcase/dtos/showcase.dto';

@Injectable()
export class NotifyService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendPreorderNotify({
    email,
    name,
    showcase,
  }: {
    email: string;
    name: string;
    showcase: ShowcaseDto;
  }) {
    let templateName;
    if (showcase.status === ShowcaseStatus.COMING)
      templateName = 'preorder-notify-comingsoon';
    else if (showcase.status === ShowcaseStatus.SHOWCASE)
      templateName = 'preorder-notify-showcase';
    else templateName = 'preorder-notify-idea';
    await this.mailerService.send<any>(email, templateName, {
      name,
      product_name: showcase.name,
    });
  }
}
