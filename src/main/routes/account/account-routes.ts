import { Router } from 'express';
import { adaptMiddleware } from '../../adapters/express-middleware-adapter';
import { adaptRoute } from '../../adapters/express-route-adapter';
import { makeDisableController } from '../../factories/controllers/account/delete';
import { makeEditController } from '../../factories/controllers/account/edit';
import { makeAuthMiddleware } from '../../factories/middleware/auth-middleware-factory';

export default (router: Router): void => {
  const authMiddleware = adaptMiddleware(makeAuthMiddleware());
  router.delete(
    '/account',
    authMiddleware,
    adaptRoute(makeDisableController()),
  );
  router.put('/account', authMiddleware, adaptRoute(makeEditController()));
};
