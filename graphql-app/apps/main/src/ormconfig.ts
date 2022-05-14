import { join } from 'path';
import { DataSource } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5433,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'test',
};

const dataSource = new DataSource({
  type: 'postgres',
  host: config.host,
  port: config.port as unknown as number,
  username: config.user,
  password: config.password,
  database: config.database,
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  entities: [join(process.cwd(), '**/*.entity{.ts,.js}')],
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsTransactionMode: 'each',
  logging: ['query', 'warn', 'error'],
  // logging: 'all',
  // logger: process.env.NODE_ENV === 'production' ? 'file' : 'debug',
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
});

export default dataSource;
