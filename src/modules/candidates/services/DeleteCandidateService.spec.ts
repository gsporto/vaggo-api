import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeCandidatesRepository from '../repositories/fakes/FakeCandidatesRepository';
import DeleteCandidateService from './DeleteCandidateService';

let fakeCandidatesRepository: FakeCandidatesRepository;
let deleteCandidate: DeleteCandidateService;
let fakeCacheProvider: FakeCacheProvider;

describe('UpdateCandidate', () => {
  beforeEach(() => {
    fakeCandidatesRepository = new FakeCandidatesRepository();
    fakeCacheProvider = new FakeCacheProvider();

    deleteCandidate = new DeleteCandidateService(
      fakeCandidatesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able delete the candidate', async () => {
    const candidate = await fakeCandidatesRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 18,
      linkedin: 'linkedin.com/in/johndoe/',
      techs: ['Angular', 'C#'],
    });

    const deleted = await deleteCandidate.execute(candidate.id);

    expect(deleted).toBe(undefined);
  });

  it('should not be able delete the candidate with non existinhg id', async () => {
    await fakeCandidatesRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 18,
      linkedin: 'linkedin.com/in/johndoe/',
      techs: ['Angular', 'C#'],
    });

    expect(deleteCandidate.execute('non-existing-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
