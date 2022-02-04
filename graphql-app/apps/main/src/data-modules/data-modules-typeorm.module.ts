import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as connectionOptions from '../ormconfig';
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
      port: +config.get('DB_PORT'),
      username: config.get('DB_USER'),
      password: config.get('DB_PASS'),
      database: config.get('DB_NAME'),
      migrationsRun: config.get('DB_MIGRATION') === 'true',
      entities: [],
      autoLoadEntities: true,
      migrations: globImport(require.context('../migrations', false, /\.ts/)),
    });
  },
});
