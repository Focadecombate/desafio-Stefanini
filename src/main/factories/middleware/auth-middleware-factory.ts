import { AuthMiddleware } from '../../../presentation/middleware/auth-middleware';
import { Middleware } from '../../../presentation/protocols';
import { makeDbLoadAccountByToken } from '../useCases/account/load-account-by-token/db-load-account-by-token-factory';

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken());
};
