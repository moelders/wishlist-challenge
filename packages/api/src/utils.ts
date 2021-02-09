import type { AuthRoute } from './middlewares/auth.ts';
import { QueryParams } from './types.ts';

export function getRouteRegExp(route: string): RegExp {
  return new RegExp(`^${ route.replaceAll(/\/:\w+/g, () => '/[\\w-_]+') }$`)
}

export function getMatchRoute(authRoutes: AuthRoute[]) {
  return function(method: string, url: string): AuthRoute | { auth: boolean } {
    return authRoutes.find(({ method: authMethod, route: authRoute }: AuthRoute) =>
      method === authMethod && getRouteRegExp(authRoute).test(url)) || { auth: false };
  };
}

export function createQueryString(params: QueryParams): string {
  return Object.keys(params)
    .map((param) => `${ encodeURIComponent(param) }=${ encodeURIComponent(params[param]) }`)
    .join('&');
}

export function getDbKey(...params: string[]): string {
  return params.filter((param) => param).join(':');
}

export function randomizeArray(array: any[]): any[] {
  function getRandomInt(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }

  const _array = [ ...array ];
  const { length } = _array;

  return _array.reduce((randomizedArray, item, index, array) => {
    const randomIndex = getRandomInt(0, length - 1);

    randomizedArray[index] = array[randomIndex];
    randomizedArray[randomIndex] = item;

    return randomizedArray;
  }, _array);
}
