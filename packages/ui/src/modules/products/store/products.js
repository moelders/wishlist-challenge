import { createSlice } from '@reduxjs/toolkit';
import { logout, getProductsSuccess } from '../../../store/actions';

export const initialState = {
  products: [],
  total: 0,
  loading: false,
  error: ''
};

export const { actions, reducer } = createSlice({
  name: 'products',
  reducers: {
    getProductsStart(state) {
      state.loading = true;
      state.error = '';
    },
    getProductsError(state, { payload: { error } }) {
      state.products = [];
      state.total = 0;
      state.loading = false;
      state.error = error;
    }
  },
  extraReducers: {
    [getProductsSuccess](state, { payload: { data } }) {
      const { total, data: { products } } = data;

      state.loading = false;
      state.products = products;
      state.total = total;
    },
    [logout](state) {
      state.products = [];
      state.total = 0;
      state.loading = false;
      state.error = '';
    }
  },
  initialState
});

export const { getProductsStart, getProductsError } = actions;
