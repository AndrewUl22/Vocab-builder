import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/api';

// Confirmed against the live Swagger docs: GET /words/statistics,
// no params, returns { totalCount }.
export const fetchStatistics = createAsyncThunk(
  'words/fetchStatistics',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get('/words/statistics');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
