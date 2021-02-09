import { Context } from 'https://deno.land/x/oak/mod.ts';

export async function corsMiddleware({ response }: Context, next: () => Promise<void>) {
  const { headers } = response;

  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  headers.append('Access-Control-Allow-Headers', '*');

  await next();
}
