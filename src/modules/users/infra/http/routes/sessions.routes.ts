import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '../controllers/SessionsController';

// Routes
const sessionsRouter = Router();

//Controllers
const sessionsController = new SessionsController();

sessionsRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().required(),
			password: Joi.string().required(),
		},
	}),
	sessionsController.sessions,
);

export default sessionsRouter;
