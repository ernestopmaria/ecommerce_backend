import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import CustomerController from '../controller/CustomerController';

// Routes
const customersRouter = Router();

//Middleware de Autenticação

customersRouter.use(isAuthenticated);

//Controllers
const customersController = new CustomerController();

customersRouter.get('/', customersController.index);
customersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().required(),
		},
	}),
	customersController.create,
);

customersRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	customersController.show,
);
customersRouter.put(
	'/:id',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().required(),
		},
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	customersController.update,
);
customersRouter.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	customersController.delete,
);

export default customersRouter;
