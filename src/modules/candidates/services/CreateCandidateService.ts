import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICandidateRepository from '../repositories/ICandidateRepository';

import Candidate from '../infra/typeorm/entities/Candidate';
import ICreateCandidateDTO from '../dtos/ICreateCandidateDTO';

@injectable()
class CreateCandidateService {
  constructor(
    @inject('CandidatesRepository')
    private candidatesRepository: ICandidateRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    email,
    age,
    linkedin,
    techs,
  }: ICreateCandidateDTO): Promise<Candidate> {
    const checkCandidateExists = await this.candidatesRepository.findByEmail(
      email,
    );

    if (checkCandidateExists) {
      throw new AppError('Email address already used.');
    }

    const candidate = await this.candidatesRepository.create({
      name,
      email,
      age,
      linkedin,
      techs,
    });

    await this.cacheProvider.invalidate('candidates-list');

    return candidate;
  }
}

export default CreateCandidateService;
