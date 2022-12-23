import { Router } from 'express';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

// Routes
const productsRouter = Router();

productsRouter.use(isAuthenticated);

//Controllers
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);
productsRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			price: Joi.number().precision(2).required(),
			quantity: Joi.number().required(),
		},
	}),
	productsController.create,
);

productsRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	productsController.show,
);
productsRouter.put(
	'/:id',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			price: Joi.number().precision(2).required(),
			quantity: Joi.number().required(),
		},
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	productsController.update,
);
productsRouter.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	productsController.delete,
);

export default productsRouter;
