import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { SettingEntity } from './setting.entity';
import { SettingResolver } from './setting.resolver';

const ormModule = NestjsQueryTypeOrmModule.forFeature([SettingEntity]);

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [ormModule],
    }),
  ],
  providers: [SettingResolver],
})
export class SettingsModule {}
