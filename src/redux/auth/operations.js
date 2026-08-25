import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance, setAuthHeader, clearAuthHeader } from '../../services/api';

// Confirmed against the live Swagger docs (Auth tag):
// POST /users/signup -> 201 { email, name, token }
// POST /users/signin -> 200 { email, name, token }
// GET  /users/current -> 200 { _id, name, email, token }
// POST /users/signout -> 200 { message }
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await instance.post('/users/signup', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const { data } = await instance.post('/users/signin', credentials);
    setAuthHeader(data.token);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await instance.post('/users/signout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (!persistedToken) return thunkAPI.rejectWithValue('No token');
    try {
      setAuthHeader(persistedToken);
      const { data } = await instance.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
