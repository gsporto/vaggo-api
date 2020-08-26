import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import candidateRouter from '@modules/candidates/infra/http/routes/candidate.routes';
import candidatesRouter from '@modules/candidates/infra/http/routes/candidates.routes';

import authenticateRouter from '@modules/users/infra/http/routes/Authenticate.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/authenticate', authenticateRouter);
routes.use('/me', profileRouter);

routes.use('/candidate', candidateRouter);
routes.use('/candidates', candidatesRouter);

export default routes;
