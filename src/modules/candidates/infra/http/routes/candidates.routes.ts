import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CandidatesController from '../controller/CandidateController';

const candidatesRouter = Router();
const candidateController = new CandidatesController();

candidatesRouter.use(ensureAuthenticated);

candidatesRouter.get(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      'content-length': Joi.equal('0'),
    }).unknown(),
  }),
  candidateController.listAll,
);

export default candidatesRouter;
