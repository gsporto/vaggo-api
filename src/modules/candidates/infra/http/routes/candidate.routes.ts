import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CandidatesController from '../controller/CandidateController';

const candidatesRouter = Router();
const candidateController = new CandidatesController();

candidatesRouter.use(ensureAuthenticated);

candidatesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      age: Joi.number().required(),
      linkedin: Joi.string().required(),
      techs: Joi.array()
        .items(
          Joi.string().valid(
            'C#',
            'Javascript',
            'Nodejs',
            'Angular',
            'React',
            'Ionic',
            'Mensageria',
            'PHP',
            'Laravel',
          ),
        )
        .required(),
    },
  }),
  candidateController.create,
);

candidatesRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      age: Joi.number(),
      linkedin: Joi.string(),
      techs: Joi.array().items(
        Joi.string().valid(
          'C#',
          'Javascript',
          'Nodejs',
          'Angular',
          'React',
          'Ionic',
          'Mensageria',
          'PHP',
          'Laravel',
        ),
      ),
    },
  }),
  candidateController.update,
);

candidatesRouter.delete(
  '/:id',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      'content-length': Joi.equal('0'),
    }).unknown(),
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  candidateController.delete,
);

// candidatesRouter.get(
//   '/',
//   celebrate({
//     [Segments.HEADERS]: Joi.object({
//       'content-length': Joi.equal('0'),
//     }).unknown(),
//   }),
//   candidateController.listAll,
// );

candidatesRouter.get(
  '/:id',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      'content-length': Joi.equal('0'),
    }).unknown(),
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  candidateController.show,
);

export default candidatesRouter;
