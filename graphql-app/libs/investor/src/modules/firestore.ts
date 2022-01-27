import { NestjsQueryFirestoreModule } from '@app/query-firestore';
import { InvestorRegistrationDto } from '@app/investor/dtos/investor-registration.dto';

export const InvestorRegistrationFirestoreModule =
  NestjsQueryFirestoreModule.forFeature(InvestorRegistrationDto);
