import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_TEST || 'test',
};

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: config.host,
  port: config.port as unknown as number,
  username: config.user,
  password: config.password,
  database: config.database,
  entities: [join(__dirname, '**/*.model{.ts,.js}')],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === 'production' ? 'file' : 'debug',
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = connectionOptions;
