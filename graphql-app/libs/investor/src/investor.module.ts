import { Module } from '@nestjs/common';
import { InvestorRegistrationFirestoreModule } from '@app/investor/modules/firestore';
import { InvestorRegistrationGraphqlModule } from '@app/investor/modules/investor-registration-graphql.module';
import { MailerModule } from '@app/mailer';
import { InvestorCreateResolver } from '@app/investor/resolvers/create.resolver';

@Module({
  imports: [
    InvestorRegistrationFirestoreModule,
    InvestorRegistrationGraphqlModule,
    MailerModule,
  ],
  providers: [InvestorCreateResolver],
  exports: [],
})
export class InvestorModule {}
