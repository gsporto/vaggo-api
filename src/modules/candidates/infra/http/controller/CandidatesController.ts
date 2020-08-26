import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCandidateService from '@modules/candidates/services/ListCandidateService';

export default class CandidateController {
  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listCandidate = container.resolve(ListCandidateService);

    const candidates = await listCandidate.execute();

    return response.json(candidates);
  }
}
