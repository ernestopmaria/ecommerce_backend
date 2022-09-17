import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserController from '../controllers/UserController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

// Routes
const userRouter = Router();

//Controllers
const userController = new UserController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

userRouter.get('/', isAuthenticated, userController.index);
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

userRouter.patch(
	'/avatar',
	isAuthenticated,
	upload.single('avatar'),
	userAvatarController.update,
);

export default userRouter;
