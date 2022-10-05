import { Global, Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { NestjsQueryFirestoreModule } from '@app/query-firestore';
import { MailDto } from '@app/mailer/dtos/mail.dto';
import { MailerResolver } from '@app/mailer/mailer.resolver';
import { MailerTemplateGraphqlModule } from '@app/mailer/modules/mailer-template-graphql.module';

@Global()
@Module({
  imports: [
    NestjsQueryFirestoreModule.forFeature(MailDto),
    MailerTemplateGraphqlModule,
  ],
  providers: [MailerService, MailerResolver],
  exports: [MailerService],
})
export class MailerModule {}
