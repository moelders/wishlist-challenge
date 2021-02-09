import { createContext, useContext } from 'react';
import { init as initAuth } from './auth';
import { init as initProducts } from './products';
import { init as initWishlist } from './wishlist';

const ApiContext = createContext();

export const api = {
  auth: initAuth,
  products: initProducts,
  wishlist: initWishlist
};

export const { Provider } = ApiContext;

export function useApi(api, options) {
  return useContext(ApiContext)[api](options);
}
