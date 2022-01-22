import { Global, Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { NestjsQueryFirestoreModule } from '@app/query-firestore';
import { MailDto } from '@app/mailer/dtos/mail.dto';
import { MailerResolver } from '@app/mailer/mailer.resolver';

@Global()
@Module({
  imports: [NestjsQueryFirestoreModule.forFeature(MailDto)],
  providers: [MailerService, MailerResolver],
  exports: [MailerService],
})
export class MailerModule {}
