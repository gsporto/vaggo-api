import { ConnectionOptions } from 'typeorm';
import path from 'path';

const config: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || undefined,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: [
    path.resolve(__dirname, '../modules/**/infra/typeorm/entities/*{.ts,.js}'),
  ],
  migrations: [
    path.resolve(__dirname, '../shared/infra/typeorm/migrations/*{.ts,.js}'),
  ],
  cli: {
    migrationsDir: path.resolve(
      __dirname,
      '../shared/infra/typeorm/migrations',
    ),
  },
};

export default config;
