import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseStrategy } from './firebase.strategy';
import { AuthController } from './auth.controller';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { AuthModel } from './auth.model';

const ormModule = NestjsQueryTypeOrmModule.forFeature([AuthModel]);

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'firebase' }),
    ormModule,
  ],
  providers: [FirebaseStrategy],
  exports: [FirebaseStrategy, ormModule],
  controllers: [AuthController],
})
export class AuthModule {}
