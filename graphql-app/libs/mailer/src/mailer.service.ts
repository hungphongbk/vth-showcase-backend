import { Injectable } from '@nestjs/common';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { MailDto } from '@app/mailer/dtos/mail.dto';

@Injectable()
export class MailerService {
  constructor(
    @InjectQueryService(MailDto)
    private readonly mailQueryService: QueryService<MailDto>,
  ) {}

  async sendPreorderNotify(payload: {
    email: string;
    name: string;
    product_name: string;
    // product_link: string;
  }) {
    await this.mailQueryService.createOne({
      to: [payload.email],
      template: {
        name: 'preorder-notify',
        data: {
          name: payload.name,
          product_name: payload.product_name,
        },
      },
    });
  }
}
