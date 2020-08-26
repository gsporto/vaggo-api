import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICandidateRepository from '../repositories/ICandidateRepository';

import Candidate from '../infra/typeorm/entities/Candidate';

interface IRequest {
  id: string;
}

@injectable()
class ShowCandidateService {
  constructor(
    @inject('CandidatesRepository')
    private candidatesRepository: ICandidateRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Candidate> {
    const candidate = await this.candidatesRepository.findById(id);

    if (!candidate) {
      throw new AppError('Candidate not found.');
    }

    return candidate;
  }
}

export default ShowCandidateService;
