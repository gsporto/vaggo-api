import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICandidateRepository from '../repositories/ICandidateRepository';

import Candidate from '../infra/typeorm/entities/Candidate';
import Techs from '../dtos/ITechsDTO';

interface IRequest {
  id: string;
  name: string;
  email: string;
  age: number;
  linkedin: string;
  techs: Techs[];
}

@injectable()
class UpdateCandidateService {
  constructor(
    @inject('CandidatesRepository')
    private candidatesRepository: ICandidateRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    email,
    age,
    linkedin,
    techs,
  }: IRequest): Promise<Candidate> {
    let candidate = await this.candidatesRepository.findById(id);

    if (!candidate) {
      throw new AppError('Candidate not found.');
    }

    const candidateWithUpdatedEmail = await this.candidatesRepository.findByEmail(
      email,
    );

    if (candidateWithUpdatedEmail && candidateWithUpdatedEmail.id !== id) {
      throw new AppError('E-mail already in use.');
    }

    candidate = {
      ...candidate,
      name,
      email,
      age,
      linkedin,
      techs,
    };

    await this.cacheProvider.invalidate('candidates-list');
    return this.candidatesRepository.save(candidate);
  }
}

export default UpdateCandidateService;
