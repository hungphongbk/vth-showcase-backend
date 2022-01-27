import { InputType, OmitType } from '@nestjs/graphql';
import { InvestorRegistrationDto } from '@app/investor/dtos/investor-registration.dto';

@InputType()
export class InvestorRegistrationCreateDto extends OmitType(
  InvestorRegistrationDto,
  ['id', 'promotedUid'],
  InputType,
) {}
