import { createAsyncThunk } from '@reduxjs/toolkit';
import { isLoggedIn, login, register, logout } from '../../apis/auth';

export const checkLoginStatus = createAsyncThunk(
  'auth/checkLogin',
  async (param, thunkAPI) => {
    try {
      const response = await isLoggedIn();

      return {
        isAuthenticated: response.loggedIn,
        user: response.user
      }
    } catch(err) {
      throw err;
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await login(credentials);
      return {
        user: response,
        isAuthenticated: true
      }
    } catch(err) {
      throw err;
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials, thunkAPI) => {
    try {
      await register(credentials);
      return {};
    } catch(err) {
      throw err;
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async(param, thunkAPI) => {
    try {
      const response = await logout();
      return response;
    } catch(err){
      throw err;
    }
  }
);