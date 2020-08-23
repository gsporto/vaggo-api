import { getRepository, Repository } from 'typeorm';

import ICandidateRepository from '@modules/candidates/repositories/ICandidateRepository';
import ICreateCandidateDTO from '@modules/candidates/dtos/ICreateCandidateDTO';

import Candidate from '../entities/Candidate';

class CandidatesRepository implements ICandidateRepository {
  private ormRepository: Repository<Candidate>;

  constructor() {
    this.ormRepository = getRepository(Candidate);
  }

  public async findById(id: string): Promise<Candidate | undefined> {
    const candidate = await this.ormRepository.findOne(id);

    return candidate;
  }

  public async fetchAll(): Promise<Candidate[]> {
    const candidates = await this.ormRepository.find();

    return candidates;
  }

  public async findByEmail(email: string): Promise<Candidate | undefined> {
    const candidate = await this.ormRepository.findOne({
      where: { email },
    });

    return candidate;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }

  public async create(candidateData: ICreateCandidateDTO): Promise<Candidate> {
    const appointment = this.ormRepository.create(candidateData);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(candidate: Candidate): Promise<Candidate> {
    return this.ormRepository.save(candidate);
  }
}

export default CandidatesRepository;
