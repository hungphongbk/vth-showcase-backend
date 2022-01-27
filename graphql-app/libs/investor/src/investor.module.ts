import { Module } from '@nestjs/common';
import { InvestorService } from './investor.service';
import { InvestorRegistrationFirestoreModule } from '@app/investor/modules/firestore';
import { InvestorRegistrationGraphqlModule } from '@app/investor/modules/investor-registration-graphql.module';
import { MailerModule } from '@app/mailer';

@Module({
  imports: [
    InvestorRegistrationFirestoreModule,
    InvestorRegistrationGraphqlModule,
    MailerModule,
  ],
  providers: [InvestorService],
  exports: [InvestorService],
})
export class InvestorModule {}
