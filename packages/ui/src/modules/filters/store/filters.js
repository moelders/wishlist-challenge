import { createSlice } from '@reduxjs/toolkit';
import { getProductsSuccess, setFilters, setFiltersVisible } from '../../../store/actions';

export const initialState = {
  filters: {
    horizontal: false,
    type: '',
    sorting: {
      property: 'rating',
      direction: ''
    },
    pagination: {
      page: 1,
      totalPages: 0,
      pageSize: 0
    }
  },
  visible: false
};

export const { actions, reducer } = createSlice({
  name: 'filters',
  extraReducers: {
    [setFilters](state, { payload: { filters } }) {
      state.filters = {
        ...state.filters,
        ...filters
      };
    },
    [setFiltersVisible](state, { payload: { visible } }) {
      state.visible = visible;
    },
    [getProductsSuccess](state, { payload: { data } }) {
      const { page, pageSize, pages } = data;

      state.filters.pagination.page = page;
      state.filters.pagination.totalPages = pages;
      state.filters.pagination.pageSize = pageSize;
    }
  },
  initialState
});
