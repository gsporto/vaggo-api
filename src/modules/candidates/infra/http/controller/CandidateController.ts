import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCandidateService from '@modules/candidates/services/CreateCandidateService';
import UpdateCandidateService from '@modules/candidates/services/UpdateCandidateService';
import ShowCandidateService from '@modules/candidates/services/ShowCandidateService';
import ListCandidateService from '@modules/candidates/services/ListCandidateService';
import DeleteCandidateService from '@modules/candidates/services/DeleteCandidateService';

export default class CandidateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, age, linkedin, techs } = request.body;

    const createCandidate = container.resolve(CreateCandidateService);

    const candidate = await createCandidate.execute({
      name,
      email,
      age,
      linkedin,
      techs,
    });

    return response.json(candidate);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, age, linkedin, techs } = request.body;

    const updateCandidate = container.resolve(UpdateCandidateService);

    const candidate = await updateCandidate.execute({
      id,
      name,
      email,
      age,
      linkedin,
      techs,
    });

    return response.json(candidate);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCandidate = container.resolve(DeleteCandidateService);

    await deleteCandidate.execute(id);

    return response.status(204).json();
  }

  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listCandidate = container.resolve(ListCandidateService);

    const candidates = await listCandidate.execute();

    return response.json(candidates);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCandidate = container.resolve(ShowCandidateService);

    const candidate = await showCandidate.execute({ id });

    return response.json(candidate);
  }
}
