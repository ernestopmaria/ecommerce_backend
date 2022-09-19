import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

// Routes
const passwordRouter = Router();

//Controllers
const forgotPasswordController = new ForgotPasswordController();


passwordRouter.post(
	'/forgot',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().required(),
		},
	}),
	forgotPasswordController.create,
);

passwordRouter.post(
	'/reset',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().required(),
		},
	}),
	forgotPasswordController.create,
);

export default passwordRouter;
