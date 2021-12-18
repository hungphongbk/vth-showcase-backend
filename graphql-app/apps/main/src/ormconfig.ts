import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'test',
};
const isProduction = process.env.NODE_ENV === 'production';
const migrationSrcDir = isProduction ? 'dist' : 'src';

console.log(config);

const connectionOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: config.host,
  port: config.port as unknown as number,
  username: config.user,
  password: config.password,
  database: config.database,
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  entities: [join(__dirname, '**/*.entity{.ts,.js}')],
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: [!isProduction && 'query', 'warn', 'error'] as any,
  // logging: 'all',
  // logger: process.env.NODE_ENV === 'production' ? 'file' : 'debug',
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: `${migrationSrcDir}/migrations`,
  },
};

export = connectionOptions;
