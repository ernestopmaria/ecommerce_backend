import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserProfileController from '../controllers/ProfileController';

import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

// Routes
const profileRouter = Router();

//Controllers

const userPerfilController = new UserProfileController();

profileRouter.get('/', isAuthenticated, userPerfilController.show);

profileRouter.put(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			old_password: Joi.string(),
			password: Joi.string().optional(),
			password_confirmation: Joi.string()
				.valid(Joi.ref('password'))
				.when('password', {
					is: Joi.exist(),
					then: Joi.required(),
				}),
		},
	}),
	isAuthenticated,

	userPerfilController.update,
);

export default profileRouter;
