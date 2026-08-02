import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/api';

// GET /words/categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get('/words/categories');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
