import { Context } from 'https://deno.land/x/oak/mod.ts';
import * as log from 'https://deno.land/std/log/mod.ts';
import { getMatchRoute } from '../utils.ts';
import type { AuthRoute } from './auth.ts';

export function loggingMiddleware(authRoutes: AuthRoute[]) {
  const matchRoute = getMatchRoute(authRoutes);

  return async function({ request: { method, url } }: Context, next: () => Promise<void>) {
    const { pathname } = url;
    const { auth } = matchRoute(method, pathname);

    log.debug(`API request: ${ method } ${ url } (requires auth: ${ auth })`);

    await next();
  };
}
