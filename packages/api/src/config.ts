import { config } from 'https://deno.land/x/dotenv/mod.ts';

export type Config = {
  [key: string]: any
};

const {
  API_PORT,
  PRODUCTS_API_URL,
  PRODUCTS_API_TYPES,
  PRODUCTS_API_SORTINGS,
  AUTH_API_URL,
  DB_HOST,
  DB_PORT,
  PAGE_SIZE,
  LOCAL_ENV,
  LOCAL_ENV_URL,
  LOCAL_ENV_TYPES,
  LOCAL_ENV_ASSETS_HOST
} = config({
  safe: true
});

const server: Config = {
  port: +(Deno.env.get('API_PORT') || API_PORT)
};

const database: Config = {
  hostname: Deno.env.get('DB_HOST') || DB_HOST,
  port: +(Deno.env.get('DB_PORT') || DB_PORT),
  loadedKey: 'dbloaded'
};

const api: Config = {
  products: {
    url: PRODUCTS_API_URL,
    types: PRODUCTS_API_TYPES.split(','),
    pageSize: +PAGE_SIZE,
    sortings: (PRODUCTS_API_SORTINGS ? PRODUCTS_API_SORTINGS.split(',') : []).concat('')
  },
  auth: {
    url: Deno.env.get('AUTH_API_URL') || AUTH_API_URL
  }
};

const local: Config = {
  local: (Deno.env.get('LOCAL_ENV') || LOCAL_ENV) === 'true',
  url: LOCAL_ENV_URL,
  types: LOCAL_ENV_TYPES.split(','),
  assetsHost: LOCAL_ENV_ASSETS_HOST
};

export function getServerConfig(): Config {
  return server;
}

export function getDatabaseConfig(): Config {
  return database;
}

export function getApiConfig(key: string): Config {
  return api[key];
}

export function getAuthHeaders(): string[] {
  return [ 'authorization', 'Authorization', 'WWW-Authenticate' ];
}

export function getLocalEnvConfig(): Config {
  return local;
}
