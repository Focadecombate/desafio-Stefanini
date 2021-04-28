import { Express, Router } from 'express';
import accountRoutes from '../routes/account/account-routes';
import loginRoutes from '../routes/login/login-routes';
import healthRoutes from '../routes/health/health-routes';

export default (app: Express) => {
  const router = Router();
  app.use('/api', router);
  accountRoutes(router);
  loginRoutes(router);
  healthRoutes(router);
};
