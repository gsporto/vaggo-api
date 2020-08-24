import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeCandidatesRepository from '../repositories/fakes/FakeCandidatesRepository';
import UpdateCandidateService from './UpdateCandidateService';

let fakeCandidatesRepository: FakeCandidatesRepository;
let updateCandidate: UpdateCandidateService;
let fakeCacheProvider: FakeCacheProvider;

describe('UpdateCandidate', () => {
  beforeEach(() => {
    fakeCandidatesRepository = new FakeCandidatesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    updateCandidate = new UpdateCandidateService(
      fakeCandidatesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able update the candidate', async () => {
    const candidate = await fakeCandidatesRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 18,
      linkedin: 'linkedin.com/in/johndoe/',
      techs: ['Angular', 'C#'],
    });

    await fakeCandidatesRepository.create({
      name: 'John Doe',
      email: 'johnTre@example.com',
      age: 18,
      linkedin: 'linkedin.com/in/johndoe/',
      techs: ['Angular', 'C#'],
    });

    await expect(
      updateCandidate.execute({
        id: candidate.id,
        name: 'John Trê',
        email: 'johnTre@example.com',
        age: 19,
        linkedin: 'linkedin.com/in/johnTre/',
        techs: ['Angular', 'C#'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the candidate from non-existing candidate', async () => {
    await expect(
      updateCandidate.execute({
        id: 'non-existing-candidate-id',
        name: 'John Doe',
        email: 'johndoe@example.com',
        age: 18,
        linkedin: 'linkedin.com/in/johndoe/',
        techs: ['Angular', 'C#'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update candidate data', async () => {
    const candidate = await fakeCandidatesRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 18,
      linkedin: 'linkedin.com/in/johndoe/',
      techs: ['Angular', 'C#'],
    });

    const updatedCandidate = await updateCandidate.execute({
      id: candidate.id,
      name: 'John Trê',
      email: 'johnTre@example.com',
      age: 19,
      linkedin: 'linkedin.com/in/johnTre/',
      techs: ['Angular', 'Javascript'],
    });

    expect(updatedCandidate.name).toBe('John Trê');
    expect(updatedCandidate.email).toBe('johnTre@example.com');
    expect(updatedCandidate.age).toBe(19);
    expect(updatedCandidate.linkedin).toBe('linkedin.com/in/johnTre/');
    expect(updatedCandidate.techs[1]).toBe('Javascript');
  });
});
