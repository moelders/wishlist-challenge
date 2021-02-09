import { createSlice } from '@reduxjs/toolkit';
import { getWishlist, addWishlistProduct, removeWishlistProduct, logout } from '../../../store/actions';

export const initialState = {
  wishlist: [],
  wishlistProducts: [],
  loading: false,
  error: ''
};

export const { actions, reducer } = createSlice({
  name: 'wishlist',
  reducers: {
    getWishlistStart(state) {
      state.loading = true;
      state.error = '';
    },
    getWishlistSuccess(state, { payload: { wishlist } }) {
      state.wishlist = wishlist;
      state.loading = false;
    },
    getWishlistError(state, { payload: { error } }) {
      state.wishlist = [];
      state.loading = false;
      state.error = error;
    },
    getWishlistProducts(state, { payload: { wishlistProducts } }) {
      state.wishlistProducts = wishlistProducts;
    }
  },
  extraReducers: {
    [getWishlist](state, { payload: { wishlist } }) {
      state.wishlist = wishlist;
      state.loading = false;
    },
    [addWishlistProduct](state, { payload: { productId } }) {
      state.wishlist.push(productId);
      state.loading = false;
    },
    [removeWishlistProduct](state, { payload: { productId } }) {
      const wishlistIndex = state.wishlist.indexOf(productId);
      const wishlistProductIndex = state.wishlistProducts.findIndex(({ productId: wishlistProductId }) =>
        productId === wishlistProductId);

      wishlistIndex >= 0 && state.wishlist.splice(wishlistIndex, 1);
      wishlistProductIndex >= 0 && state.wishlistProducts.splice(wishlistProductIndex, 1);
      state.loading = false;
    },
    [logout](state) {
      state.wishlist = [];
      state.wishlistProducts = [];
      state.loading = false;
      state.error = '';
    }
  },
  initialState
});

export const { getWishlistStart, getWishlistSuccess, getWishlistError, getWishlistProducts } = actions;
