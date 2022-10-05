import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { AuthDto } from '@app/auth';

@InputType('UserCreateInputDto')
export class AuthCreateDto extends OmitType(
  PartialType(AuthDto, InputType),
  ['uid', 'providedData', 'createdAt'],
  InputType,
) {
  @Field({ nullable: true })
  password?: string;
}
