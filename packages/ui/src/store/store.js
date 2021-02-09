import { configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer, initialState as authInitialState } from '../modules/auth';
import { reducer as filtersReducer, initialState as filtersInitialState } from '../modules/filters';
import { reducer as productsReducer, initialState as productsInitialState } from '../modules/products';
import { reducer as wishlistReducer, initialState as wishlistInitialState } from '../modules/wishlist';

const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersReducer,
    products: productsReducer,
    wishlist: wishlistReducer
  },
  devTools: true,
  preloadedState: {
    auth: authInitialState,
    filters: filtersInitialState,
    products: productsInitialState,
    wishlist: wishlistInitialState
  }
});

export { store };
