import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeCandidateRepository from '../repositories/fakes/FakeCandidatesRepository';
import CreateCandidateService from './CreateCandidateService';
import ListCandidateService from './ListCandidateService';

let fakeCandidatesRepository: FakeCandidateRepository;
let fakeCacheProvider: FakeCacheProvider;
let createCandidate: CreateCandidateService;
let listCandidateService: ListCandidateService;

describe('CreateCandidate', () => {
  beforeEach(() => {
    fakeCandidatesRepository = new FakeCandidateRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createCandidate = new CreateCandidateService(
      fakeCandidatesRepository,
      fakeCacheProvider,
    );
    listCandidateService = new ListCandidateService(
      fakeCandidatesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all candidates', async () => {
    const candidatesToBeCheck = [];
    candidatesToBeCheck.push(
      await createCandidate.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        age: 18,
        linkedin: 'linkedin.com/in/johndoe/',
        techs: ['Angular', 'C#'],
      }),
    );

    candidatesToBeCheck.push(
      await createCandidate.execute({
        name: 'John Tre',
        email: 'johnTre@example.com',
        age: 18,
        linkedin: 'linkedin.com/in/johnTre/',
        techs: ['Javascript', 'React'],
      }),
    );

    const list = await listCandidateService.execute();

    expect(list).toEqual(candidatesToBeCheck);
  });

  it('should be able to cache list', async () => {
    const candidatesToBeCheck = [];
    candidatesToBeCheck.push(
      await createCandidate.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        age: 18,
        linkedin: 'linkedin.com/in/johndoe/',
        techs: ['Angular', 'C#'],
      }),
    );

    const list = await listCandidateService.execute();
    const listCached = await listCandidateService.execute();

    expect(listCached).toEqual(list);
  });
});
