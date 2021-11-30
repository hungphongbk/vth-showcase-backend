import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { SettingEntity } from './setting.entity';
import { SettingDto } from './dtos/setting.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([SettingEntity])],
      resolvers: [{ DTOClass: SettingDto, EntityClass: SettingEntity }],
    }),
  ],
})
export class SettingsModule {}
