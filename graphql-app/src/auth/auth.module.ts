import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseStrategy } from './firebase.strategy';
import { AuthController } from './auth.controller';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { AuthEntity } from './auth.entity';
import { AuthSubscriber } from './auth.subscriber';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { AuthDto } from './dtos/auth.dto';
import { AuthResolver } from './auth.resolver';

const ormModule = NestjsQueryTypeOrmModule.forFeature([AuthEntity]);

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'firebase' }),
    ormModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [ormModule],
      resolvers: [{ DTOClass: AuthDto, EntityClass: AuthEntity }],
    }),
  ],
  providers: [FirebaseStrategy, AuthSubscriber, AuthResolver],
  exports: [FirebaseStrategy, ormModule],
  controllers: [AuthController],
})
export class AuthModule {}
