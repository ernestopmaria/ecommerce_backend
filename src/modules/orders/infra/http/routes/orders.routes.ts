import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import OrdersController from '../controllers/OrdersController';

// Routes
const ordersRouter = Router();

ordersRouter.use(isAuthenticated);

//Controllers
const ordersController = new OrdersController();

ordersRouter.get('/', ordersController.index);
ordersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			customer_id: Joi.string().uuid().required(),
			products: Joi.required(),
		},
	}),
	ordersController.create,
);

ordersRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	ordersController.show,
);
/* productsRouter.put(
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
); */

export default ordersRouter;
