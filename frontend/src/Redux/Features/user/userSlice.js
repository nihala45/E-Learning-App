import { createSlice } from '@reduxjs/toolkit';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../token';

const initialState = {
  isAuthenticated: !!localStorage.getItem(ACCESS_TOKEN),
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      const userData = action.payload;
    
      state.isAuthenticated = true;
      state.user = userData;
    
      localStorage.setItem(ACCESS_TOKEN, userData.access || '');
      localStorage.setItem(REFRESH_TOKEN, userData.refresh || '');
      localStorage.setItem('user', JSON.stringify(userData));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;

      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
