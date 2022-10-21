import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import userRouter from '@modules/users/routes/user.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/user', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
