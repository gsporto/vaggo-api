import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICandidateRepository from '../repositories/ICandidateRepository';

import Candidate from '../infra/typeorm/entities/Candidate';

@injectable()
class ListCandidateService {
  constructor(
    @inject('CandidatesRepository')
    private candidatesRepository: ICandidateRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Candidate[]> {
    let candidates = await this.cacheProvider.recover<Candidate[]>(
      'candidates-list',
    );

    if (!candidates) {
      candidates = await this.candidatesRepository.fetchAll();
      await this.cacheProvider.save('candidates-list', candidates);
    }

    return candidates;
  }
}

export default ListCandidateService;
