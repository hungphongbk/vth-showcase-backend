import { Global, Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { FirebaseModule } from '@app/firebase';

@Global()
@Module({
  imports: [FirebaseModule],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
