import { Context, Status } from 'https://deno.land/x/oak/mod.ts';
import type { AuthService } from '../services/auth.ts';
import { getAuthHeaders } from '../config.ts';
import { getMatchRoute } from '../utils.ts';

export type AuthRoute = {
  method: string,
  route: string,
  auth: boolean
};

export function authMiddleware(authService: AuthService, authRoutes: AuthRoute[]) {
  const matchRoute = getMatchRoute(authRoutes);

  return async function({ request, response }: Context, next: () => Promise<void>) {
    const { method, url: { pathname } } = request;
    const { auth } = matchRoute(method, pathname);

    if (auth) {
      const headers: Headers = request.headers;
      const authorization = getAuthHeaders().map((header) => headers.get(header)).find((auth) => auth);
      const [ , token ] = (authorization || '').split(' ');

      const { userName, error } = await authService.verify(token);

      if (error) {
        response.status = Status.Unauthorized;
        response.type = 'json';
        response.body = error;
      } else {
        headers.set('user', userName);

        await next();
      }
    } else {
      await next();
    }
  };
}
