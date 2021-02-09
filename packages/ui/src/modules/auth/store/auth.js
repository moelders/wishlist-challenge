import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loggedIn: false,
  userName: '',
  fullName: '',
  mail: '',
  token: ''
};

export const { actions, reducer } = createSlice({
  name: 'auth',
  reducers: {
    login(state, { payload: { userName, fullName, mail, token } }) {
      state.loggedIn = true;
      state.userName = userName;
      state.fullName = fullName;
      state.mail = mail;
      state.token = token;
    },
    logout(state) {
      state.loggedIn = false;
      state.userName = '';
      state.fullName = '';
      state.mail = '';
      state.token = '';
    }
  },
  initialState
});
