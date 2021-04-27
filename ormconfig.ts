import { ConnectionOptions } from 'typeorm';

const config: Array<ConnectionOptions> = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT) || undefined,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    entities: [`${__dirname}/src/modules/**/infra/typeorm/entities/*.ts`],
    migrations: [`${__dirname}/src/shared/infra/typeorm/migrations/*.ts`],
    cli: {
      migrationsDir: `${__dirname}/src/shared/infra/typeorm/migrations`,
    },
  },
];

export = config;
