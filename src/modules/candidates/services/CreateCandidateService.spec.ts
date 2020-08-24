import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeCandidateRepository from '../repositories/fakes/FakeCandidatesRepository';
import CreateCandidateService from './CreateCandidateService';

let fakeCandidatesRepository: FakeCandidateRepository;
let fakeCacheProvider: FakeCacheProvider;
let createCandidate: CreateCandidateService;

describe('CreateCandidate', () => {
  beforeEach(() => {
    fakeCandidatesRepository = new FakeCandidateRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createCandidate = new CreateCandidateService(
      fakeCandidatesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new candidate', async () => {
    const candidate = await createCandidate.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 18,
      linkedin: 'linkedin.com/in/johndoe/',
      techs: ['Angular', 'C#'],
    });

    expect(candidate).toHaveProperty('id');
  });

  it('should not be able to create a new candidate with same email from another', async () => {
    await createCandidate.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 18,
      linkedin: 'linkedin.com/in/johndoe/',
      techs: ['Angular', 'C#'],
    });

    await expect(
      createCandidate.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        age: 18,
        linkedin: 'linkedin.com/in/johndoe/',
        techs: ['Angular', 'C#'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
