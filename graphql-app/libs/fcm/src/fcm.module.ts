import { Module } from '@nestjs/common';
import { FcmService } from './fcm.service';
import { FcmRegistrationTokenEntity } from '@app/fcm/entities/fcm-registration-token.entity';
import { FcmRegistrationTokenSubscriber } from '@app/fcm/entities/subscriber';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { FcmResolver } from '@app/fcm/fcm.resolver';
import { AuthModule } from '@app/auth';
import { FcmRegistrationTokenDtoQueryService } from '@app/fcm/services/query-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FcmController } from '@app/fcm/fcm.controller';
import { RabbitmqClientModule } from '@app/rabbitmq-client';

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
    RabbitmqClientModule,
  ],
  providers: [
    FcmService,
    FcmRegistrationTokenDtoQueryService,
    FcmRegistrationTokenSubscriber,
    FcmResolver,
  ],
  controllers: [FcmController],
  exports: [FcmService],
})
export class FcmModule {}
