import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICandidateRepository from '../repositories/ICandidateRepository';

@injectable()
class CreateCandidateService {
  constructor(
    @inject('CandidatesRepository')
    private candidatesRepository: ICandidateRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const checkCandidateExists = await this.candidatesRepository.findById(id);

    if (!checkCandidateExists) {
      throw new AppError('Candidate not found.');
    }

    await this.candidatesRepository.delete(id);
    await this.cacheProvider.invalidate('candidates-list');
  }
}

export default CreateCandidateService;
