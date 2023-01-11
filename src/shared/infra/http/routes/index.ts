import { Router } from 'express';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import customersRouter from '@modules/customers/infra/http/routes/customer.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import dashboardRouter from '@modules/dashboard/routes/dashboard.routes';
import categoriesRouter from '@modules/products/infra/http/routes/category.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/user', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customer', customersRouter);
routes.use('/orders', ordersRouter);
routes.use('/categories', categoriesRouter);
routes.use('/dashboard', dashboardRouter);

export default routes;
