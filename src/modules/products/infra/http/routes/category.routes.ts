import { Router } from 'express';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import CategoryController from '../controllers/CategoryController';

const categoriesRouter = Router();
categoriesRouter.use(isAuthenticated);

const categoryController = new CategoryController();

categoriesRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
		},
	}),
	categoryController.create,
);

categoriesRouter.get('/', categoryController.index);

export default categoriesRouter;
