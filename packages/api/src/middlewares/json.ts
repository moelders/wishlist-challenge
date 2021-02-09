import { Context } from 'https://deno.land/x/oak/mod.ts';

export async function jsonMiddleware({ response }: Context, next: () => Promise<void>) {
  await next();

  response.type = response.type || 'json';
}
