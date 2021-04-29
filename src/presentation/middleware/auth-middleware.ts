import {
  LoadAccountByToken,
  HttpRequest,
  HttpResponse,
  Middleware,
} from './auth-middleware-protocols';
import { AccessDenied, ServerError } from '../errors';
import { forbidden, ok, serverError } from '../helper/http/httpHelper';

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const accessToken = httpRequest.headers?.authorization;
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken);
        if (account) {
          return ok({ accountId: account.id });
        }
      }
      return forbidden(new AccessDenied());
    } catch (error) {
      return serverError(new ServerError(''));
    }
  }
}
