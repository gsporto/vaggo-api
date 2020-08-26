import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import HashProvider from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';

export default class SeedUsers1598134811340 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    const usersRepository = new UsersRepository();
    const hashProvider = new HashProvider();

    const createUser = new CreateUserService(usersRepository, hashProvider);
    await createUser.execute({
      name: 'Icetec',
      email: 'comercial@icetecsolutions.com.br',
      password: 'icetec123',
    });
  }

  public async down(_: QueryRunner): Promise<void> {
    const ormRepository = getRepository(User);

    ormRepository
      .createQueryBuilder()
      .delete()
      .where({ email: 'comercial@icetecsolutions.com.br' })
      .execute();
  }
}
