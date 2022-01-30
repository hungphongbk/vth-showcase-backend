import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as connectionOptions from '../ormconfig';
import { ShowcaseEntity } from './showcase/entities/showcase.entity';
import { ShowcaseViewEntity } from './showcase/entities/showcase-view.entity';
import { ShowcaseMediaEntity } from './showcase/entities/showcase.media.entity';
import { MediaEntity } from './media/media.entity';
import { ShowcaseHFEntity } from './highlight-feature/entities/showcaseHF.entity';
import { ShowcaseHFMediaEntity } from './highlight-feature/entities/showcaseHF.media.entity';
import { ImageListEntity } from './image-list/entities/image-list.entity';
import { ImageListMediaEntity } from './image-list/entities/image-list.media.entity';
import { InvestmentPackageEntity } from './investment';
import { CommentEntity } from './comment/comment.entity';
import { SettingEntity } from './setting/setting.entity';
import { PrjUpdateEntity } from './prj-update/prj-update.entity';
import { PreorderEntity } from './preorder/entities/preorder.entity';
import * as Joi from 'joi';

function globImport(r: any) {
  return r
    .keys()
    .map(r)
    .reduce((acc, val) => [...acc, ...Object.values(val)], []);
}

interface DbConnectionConfig {
  DB_HOST: string;
  DB_PORT: number;
  DB_MIGRATION: boolean;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;
}

export const DataModulesTypeormModule = TypeOrmModule.forRootAsync({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_MIGRATION: Joi.boolean().required(),
        DB_USER: Joi.string().default('postgres'),
        DB_PASS: Joi.string().default('postgres'),
        DB_NAME: Joi.string().default('test'),
      }),
    }),
  ],
  inject: [ConfigService],
  useFactory: (config: ConfigService<DbConnectionConfig>) => {
    return Object.assign(connectionOptions, {
      host: config.get('DB_HOST'),
      port: config.get('DB_PORT'),
      username: config.get('DB_USER'),
      password: config.get('DB_PASS'),
      database: config.get('DB_NAME'),
      migrationsRun: config.get('DB_MIGRATION') === 'true',
      entities: [
        ShowcaseEntity,
        ShowcaseViewEntity,
        ShowcaseMediaEntity,
        MediaEntity,
        ShowcaseHFEntity,
        ShowcaseHFMediaEntity,
        ImageListEntity,
        ImageListMediaEntity,
        InvestmentPackageEntity,
        CommentEntity,
        SettingEntity,
        PrjUpdateEntity,
        PreorderEntity,
      ],
      migrations: globImport(require.context('../migrations', false, /\.ts/)),
    });
  },
});
