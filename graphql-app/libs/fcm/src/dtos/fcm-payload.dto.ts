import { Field, InputType } from '@nestjs/graphql';
import { messaging } from 'firebase-admin';

@InputType()
class FcmNotificationPayloadDto {
  @Field({ nullable: true })
  body: string;

  @Field({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  title: string;
}

@InputType()
export class FcmPayloadDto {
  @Field({ nullable: true })
  notification: FcmNotificationPayloadDto;
}
