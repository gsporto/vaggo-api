import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthenticateController from '../controllers/AuthenticateController';

const authenticateRouter = Router();
const authenticateController = new AuthenticateController();

authenticateRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authenticateController.create,
);

export default authenticateRouter;
