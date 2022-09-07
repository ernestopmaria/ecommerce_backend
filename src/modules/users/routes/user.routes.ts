import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controllers/UserController';

// Routes
const userRouter = Router();

//Controllers
const userController = new UserController();

userRouter.get('/', userController.index);
userRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().required(),
			password: Joi.string().required(),
		},
	}),
	userController.create,
);

userRouter.post(
	'/sessions',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().required(),
			password: Joi.string().required(),
		},
	}),
	userController.sessions,
);

export default userRouter;
