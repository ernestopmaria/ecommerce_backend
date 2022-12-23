import { Router } from 'express';

import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import DashoardController from '../controllers/DashboardController';

// Routes
const dashboardRouter = Router();

dashboardRouter.use(isAuthenticated);

const dashboardController = new DashoardController();

dashboardRouter.get('/', dashboardController.index);

export default dashboardRouter;
