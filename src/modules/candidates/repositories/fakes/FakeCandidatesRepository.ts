import { v4 as uuid } from 'uuid';

import ICandidateRepository from '@modules/candidates/repositories/ICandidateRepository';
import ICreateCandidateDTO from '@modules/candidates/dtos/ICreateCandidateDTO';

import Candidate from '../../infra/typeorm/entities/Candidate';

class FakeCandidatesRepository implements ICandidateRepository {
  private candidates: Candidate[] = [];

  public async findById(id: string): Promise<Candidate | undefined> {
    const findCandidate = this.candidates.find(
      candidate => candidate.id === id,
    );

    return findCandidate;
  }

  public async fetchAll(): Promise<Candidate[]> {
    return this.candidates;
  }

  public async delete(id: string): Promise<void> {
    const candidatesDeleted = this.candidates.filter(
      candidate => candidate.id !== id,
    );
    this.candidates = [...candidatesDeleted];
  }

  public async findByEmail(email: string): Promise<Candidate | undefined> {
    const findCandidate = this.candidates.find(
      candidate => candidate.email === email,
    );

    return findCandidate;
  }

  public async create(candidateData: ICreateCandidateDTO): Promise<Candidate> {
    const candidate = new Candidate();

    Object.assign(candidate, { id: uuid() }, candidateData);

    this.candidates.push(candidate);

    return candidate;
  }

  public async save(candidate: Candidate): Promise<Candidate> {
    const findIndex = this.candidates.findIndex(
      findCandidate => findCandidate.id === candidate.id,
    );

    this.candidates[findIndex] = candidate;

    return candidate;
  }
}

export default FakeCandidatesRepository;
