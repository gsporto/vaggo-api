import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ICandidateRepository from '@modules/candidates/repositories/ICandidateRepository';
import CandidatesRepository from '@modules/candidates/infra/typeorm/repositories/CandidatesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICandidateRepository>(
  'CandidatesRepository',
  CandidatesRepository,
);
