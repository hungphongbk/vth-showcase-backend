import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { SettingEntity } from './setting.entity';
import { SettingResolver } from './setting.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

const ormModule = NestjsQueryTypeOrmModule.forFeature([SettingEntity]);

@Module({
  imports: [
    TypeOrmModule.forFeature([SettingEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [ormModule],
    }),
  ],
  providers: [SettingResolver],
})
export class SettingsModule {}
