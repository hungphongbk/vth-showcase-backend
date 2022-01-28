import { Injectable } from '@nestjs/common';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { MailDto } from '@app/mailer/dtos/mail.dto';

@Injectable()
export class MailerService {
  constructor(
    @InjectQueryService(MailDto)
    private readonly mailQueryService: QueryService<MailDto>,
  ) {}

  async send<DTO>(email: string, templateName: string, data: DTO) {
    await this.mailQueryService.createOne({
      to: [email],
      template: {
        name: templateName,
        data: data,
      },
    });
  }

  async sendPreorderNotify(payload: {
    email: string;
    name: string;
    product_name: string;
    // product_link: string;
  }) {
    await this.send<any>(payload.email, 'preorder-notify', {
      name: payload.name,
      product_name: payload.product_name,
    });
  }
}
