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
        data: Object.assign({}, data),
      },
    });
  }
}
