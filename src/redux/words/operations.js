import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/api';

const toQueryParams = ({ keyword, category, isIrregular, page }) => {
  const params = { page };
  if (keyword) params.keyword = keyword;
  if (category) params.category = category;
  if (isIrregular !== undefined) params.isIrregular = isIrregular;
  return params;
};

// backend can return a plain array or an object with results and totalPages
const normalizeWordsResponse = (data, requestedPage) => {
  if (Array.isArray(data)) {
    return { results: data, totalPages: 1, page: 1 };
  }
  return {
    results: data.results ?? data.words ?? data.items ?? [],
    totalPages: data.totalPages ?? data.totalPage ?? 1,
    page: data.page ?? requestedPage ?? 1,
  };
};

// page defaults to 1, limit defaults to 7 on the backend
export const fetchWords = createAsyncThunk(
  'words/fetchWords',
  async (filters, thunkAPI) => {
    try {
      const { data } = await instance.get('/words/own', { params: toQueryParams(filters) });
      return normalizeWordsResponse(data, filters.page);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// words added by other users, used on the Recommend page
export const fetchRecommendedWords = createAsyncThunk(
  'words/fetchRecommended',
  async (filters, thunkAPI) => {
    try {
      const { data } = await instance.get('/words/all', { params: toQueryParams(filters) });
      return normalizeWordsResponse(data, filters.page);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addWord = createAsyncThunk(
  'words/addWord',
  async (values, thunkAPI) => {
    try {
      const { data } = await instance.post('/words/create', values);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// only en and ua are editable in the UI, so that is all we send
export const editWord = createAsyncThunk(
  'words/editWord',
  async ({ wordId, values }, thunkAPI) => {
    try {
      const { data } = await instance.patch(`/words/edit/${wordId}`, values);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteWord = createAsyncThunk(
  'words/deleteWord',
  async (wordId, thunkAPI) => {
    try {
      const { data } = await instance.delete(`/words/delete/${wordId}`);
      return data.id ?? wordId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// this is the Add to dictionary button on the Recommend page
export const addToDictionary = createAsyncThunk(
  'words/addToDictionary',
  async (wordId, thunkAPI) => {
    try {
      const { data } = await instance.post(`/words/add/${wordId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

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

// not used yet, will be needed for the Training page
export const fetchTasks = createAsyncThunk(
  'words/fetchTasks',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get('/words/tasks');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// not used yet, will be needed for the Training page
export const submitAnswers = createAsyncThunk(
  'words/submitAnswers',
  async (answers, thunkAPI) => {
    try {
      const { data } = await instance.post('/words/answers', answers);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
