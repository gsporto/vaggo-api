import AppError from '@shared/errors/AppError';

import FakeCandidatesRepository from '../repositories/fakes/FakeCandidatesRepository';
import ShowCandidateService from './ShowCandidateService';

let fakeCandidatesRepository: FakeCandidatesRepository;
let showCandidate: ShowCandidateService;

describe('ShowCandidate', () => {
  beforeEach(() => {
    fakeCandidatesRepository = new FakeCandidatesRepository();
    showCandidate = new ShowCandidateService(fakeCandidatesRepository);
  });

  it('should be able show the candidate', async () => {
    const candidate = await fakeCandidatesRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 18,
      linkedin: 'linkedin.com/in/johndoe/',
      techs: ['Angular', 'C#'],
    });

    const candidateshow = await showCandidate.execute({
      id: candidate.id,
    });

    expect(candidateshow.name).toBe('John Doe');
    expect(candidateshow.email).toBe('johndoe@example.com');
  });

  it('should not be able show the candidate from non-existing candidate', async () => {
    expect(
      showCandidate.execute({
        id: 'non-existing-candidate-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
