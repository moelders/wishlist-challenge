import { Router, Context } from 'https://deno.land/x/oak/mod.ts';

export type Route = {
  method: 'GET' | 'PUT' | 'POST' | 'DELETE',
  route: string,
  auth: boolean,
  handle(context: Context): void
};

export type RouteParams = {
  params: {
    [key: string]: string
  }
};

export const router = new Router();

export function registerRoute({ method, route, handle }: Route) {
  switch (method) {
    case 'GET':
      router.get(route, handle);
      break;
    case 'PUT':
      router.put(route, handle);
      break;
    case 'POST':
      router.post(route, handle);
      break;
    case 'DELETE':
      router.delete(route, handle);
      break;
  }
}

export function registerRoutes(routes: Route[]) {
  routes.forEach(registerRoute);
}
