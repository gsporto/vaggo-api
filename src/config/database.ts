import Candidates from '@modules/candidates/infra/typeorm/entities/Candidate';
import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || undefined,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: [User, UserToken, Candidates],
  migrations: [`../shared/infra/typeorm/migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: `../shared/infra/typeorm/migrations`,
  },
};

export default config;
