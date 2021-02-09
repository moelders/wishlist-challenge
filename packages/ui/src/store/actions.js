import { createAction } from '@reduxjs/toolkit';

export const login = createAction('auth/login');

export const logout = createAction('auth/logout');

export const getProductsSuccess = createAction('products/get');

export const getWishlist = createAction('wishlist/get');

export const addWishlistProduct = createAction('wishlist/put');

export const removeWishlistProduct = createAction('wishlist/remove');

export const setFilters = createAction('filters/set');

export const setFiltersVisible = createAction('filters/setVisible');
