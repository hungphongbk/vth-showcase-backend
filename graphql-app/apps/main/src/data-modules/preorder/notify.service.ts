import { Injectable } from '@nestjs/common';
import { MailerService } from '@app/mailer';
import { ShowcaseDto, ShowcaseStatus } from '../showcase/dtos/showcase.dto';
import { pick } from 'lodash';
import { PreorderDto } from './dtos/preorder.dto';

@Injectable()
export class NotifyService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendPreorderNotify({
    email,
    name,
    preorder,
    showcase,
  }: {
    email: string;
    name: string;
    preorder: PreorderDto;
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
      showcase: Object.assign({}, pick(showcase, ['name', 'image'])),
      preorder: Object.assign({}, pick(preorder, ['createdAt'])),
    });
  }
}
