import Candidate from '../infra/typeorm/entities/Candidate';
import ICreateCandidateDTO from '../dtos/ICreateCandidateDTO';

export default interface ICandidateRepository {
  findById(id: string): Promise<Candidate | undefined>;
  findByEmail(email: string): Promise<Candidate | undefined>;
  fetchAll(): Promise<Candidate[]>;
  delete(id: string): Promise<void>;
  create(candidateData: ICreateCandidateDTO): Promise<Candidate>;
  save(candidate: Candidate): Promise<Candidate>;
}
