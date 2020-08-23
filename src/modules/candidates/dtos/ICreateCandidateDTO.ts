import Techs from './ITechsDTO';

export default interface ICreateCandidateDTO {
  name: string;
  email: string;
  age: number;
  linkedin: string;
  techs: Techs[];
}
