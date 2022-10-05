import { join } from 'path';
import { DataSource } from 'typeorm';

const config = {
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  password: 'postgres',
  database: 'test',
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
  migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
});

dataSource.initialize().then(() => console.log('connected'));

export default dataSource;
