import { Module } from '@nestjs/common';
import { FcmService } from './fcm.service';
import { FcmRegistrationTokenEntity } from '@app/fcm/entities/fcm-registration-token.entity';
import { FcmRegistrationTokenSubscriber } from '@app/fcm/entities/subscriber';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { FcmResolver } from '@app/fcm/fcm.resolver';
import { AuthModule } from '@app/auth';
import { FcmRegistrationTokenDtoQueryService } from '@app/fcm/services/query-service';
import { TypeOrmModule } from '@nestjs/typeorm';

const OrmModule = NestjsQueryTypeOrmModule.forFeature([
    FcmRegistrationTokenEntity,
  ]),
  AuthoredModule = AuthModule.forFeature({
    imports: [OrmModule],
    EntityClass: FcmRegistrationTokenEntity,
  });

@Module({
  imports: [
    TypeOrmModule.forFeature([FcmRegistrationTokenEntity]),
    OrmModule,
    AuthoredModule,
  ],
  providers: [
    FcmService,
    FcmRegistrationTokenDtoQueryService,
    FcmRegistrationTokenSubscriber,
    FcmResolver,
  ],
  exports: [FcmService],
})
export class FcmModule {}
