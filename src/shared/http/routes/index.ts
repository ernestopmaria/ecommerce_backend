import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import userRouter from '@modules/users/routes/user.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/user', userRouter);

export default routes;
