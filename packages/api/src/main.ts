import * as log from 'https://deno.land/std/log/mod.ts';
import { Application } from 'https://deno.land/x/oak/mod.ts';
import { init as initDb, DbOptions } from './services/db.ts';
import { init as initProductsService } from './services/products.ts';
import { init as initWishlistService } from './services/wishlist.ts';
import { init as initAuthService } from './services/auth.ts';
import { init as initProductsApi } from './apis/products.ts';
import { init as initWishlistApi } from './apis/wishlist.ts';
import { init as initUserApi } from './apis/user.ts';
import { init as initSwaggerApi } from './apis/swagger.ts';
import { authMiddleware, AuthRoute } from './middlewares/auth.ts';
import { corsMiddleware } from './middlewares/cors.ts';
import { jsonMiddleware } from './middlewares/json.ts';
import { loggingMiddleware } from './middlewares/logging.ts';
import { notFoundMiddleware } from './middlewares/not-found.ts';
import { getDatabaseConfig, getServerConfig, getLocalEnvConfig } from './config.ts';
import { init as initData } from './data.ts';
import { router, registerRoutes } from './router.ts';
import type { Route } from './router.ts';

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler('DEBUG')
  },
  loggers: {
    default: {
      level: 'DEBUG',
      handlers: ['console'],
    }
  },
});

log.info('Starting wishlist-challenge...');

const { hostname, port } = getDatabaseConfig();
const { port: serverPort } = getServerConfig();
const { local } = getLocalEnvConfig();

log.info(`Connecting to database ${ hostname }:${ port }...`);

const db = await initDb({ hostname, port } as DbOptions);

log.info(`Initializing database ${ local ? 'with local data' : '' }...`);

await initData(db, local);

const productsService = await initProductsService(db);
const wishlistService = await initWishlistService(db);
const authService = await initAuthService();

log.info('Database initialized');

const productsApiRoutes: Route[] = initProductsApi(productsService);
const wishlistApiRoutes: Route[] = initWishlistApi(wishlistService);
const userApiRoutes: Route[] = initUserApi(authService);
const swaggerApiRoutes: Route[] = initSwaggerApi({
  swaggerDefinition: {
    info: {
      title: 'Wishlist Challenge API',
      version: '1.0.0',
      description: 'API for products, wishlists, and users'
    },
    host: `localhost:${ serverPort }`,
    basePath: '/'
  },
  apis: [
    './src/swagger/definitions.yaml',
    './src/swagger/security-definitions.yaml',
    './src/apis/user.ts',
    './src/apis/products.ts',
    './src/apis/wishlist.ts'
  ]
});

const routes: Route[] = [
  ...productsApiRoutes,
  ...wishlistApiRoutes,
  ...userApiRoutes,
  ...swaggerApiRoutes
];
const authRoutes: AuthRoute[] = routes.map(({ method, route, auth }) => ({ method, route, auth }));

const app = new Application();

registerRoutes(productsApiRoutes);
registerRoutes(wishlistApiRoutes);
registerRoutes(userApiRoutes);
registerRoutes(swaggerApiRoutes);

app.use(
  loggingMiddleware(authRoutes),
  corsMiddleware,
  authMiddleware(authService, authRoutes),
  jsonMiddleware,
  router.routes(),
  router.allowedMethods(),
  notFoundMiddleware
);

app.addEventListener('listen', ({ hostname, port, secure }) => {
  log.info(`Listening on: ${ secure ? 'https://' : 'http://' }${ hostname ?? 'localhost' }:${ port }`);
});

await app.listen({ port: serverPort });
