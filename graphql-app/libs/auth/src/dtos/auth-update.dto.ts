import { Field, InputType } from '@nestjs/graphql';
import { AuthProviderInfoInputDto, AuthRoleType } from '@app/auth';

@InputType('UserUpdateInputDto')
export class AuthUpdateDto {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  photoURL?: string;

  @Field(() => AuthRoleType, { nullable: true })
  role?: AuthRoleType;

  @Field({ nullable: true })
  providerToLink?: AuthProviderInfoInputDto;
}
