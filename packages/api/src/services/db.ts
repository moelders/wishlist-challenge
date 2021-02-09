import { connect, RedisConnectOptions } from 'https://deno.land/x/redis/mod.ts';

export type DbService = {
  get(key: string, json?: boolean): Promise<any>
  set(key: string, value: any, json?: boolean): Promise<any>,
  zadd(key: string, score: number, member: any): Promise<any>,
  zrange(key: string, start?: number, stop?: number): Promise<any>,
  zcount(key: string): Promise<number>,
  flushdb(): Promise<any>
};

export type DbOptions = RedisConnectOptions;

export async function init({ hostname, port }: DbOptions): Promise<DbService> {
  const redis = await connect({ hostname, port });

  return {
    async get(key: string, json: boolean = true): Promise<any> {
      const value = await redis.get(key) as string;

      return value && json ? JSON.parse(value) : value;
    },
    async set(key: string, value: any, json: boolean = true): Promise<any> {
      const _value = json ? JSON.stringify(value) : value;

      return await redis.set(key, _value);
    },
    async zadd(key: string, score: number, member: any): Promise<any> {
      return await redis.zadd(key, score, member);
    },
    async zrange(key: string, start: number = 0, stop: number = -1): Promise<any> {
      return await redis.zrange(key, start, stop);
    },
    async zcount(key: string): Promise<number> {
      return +(await redis.zcount(key, -Infinity, Infinity));
    },
    async flushdb(): Promise<any> {
      return await redis.flushdb(true);
    }
  }
}
