import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/api';

const handleError = (error, thunkAPI) =>
  thunkAPI.rejectWithValue(error.response?.data?.message || error.message);

// GET /words?keyword=&category=&isIrregular=&page=&limit=
// Own dictionary words
export const fetchOwnWords = createAsyncThunk(
  'words/fetchOwn',
  async (params, thunkAPI) => {
    try {
      const { data } = await instance.get('/words', { params });
      return data; // { results, page, perPage, totalPages }
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

// GET /words/all -- words added by other users, for Recommend page
export const fetchRecommendedWords = createAsyncThunk(
  'words/fetchRecommended',
  async (params, thunkAPI) => {
    try {
      const { data } = await instance.get('/words/all', { params });
      return data;
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

// GET /words/statistics
export const fetchStatistics = createAsyncThunk(
  'words/fetchStatistics',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get('/words/statistics');
      return data;
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

// POST /words  { category, isIrregular, en, ua }
export const addWord = createAsyncThunk('words/add', async (word, thunkAPI) => {
  try {
    const { data } = await instance.post('/words', word);
    return data;
  } catch (error) {
    return handleError(error, thunkAPI);
  }
});

// PATCH /words/edit/:id  { en, ua }
export const editWord = createAsyncThunk(
  'words/edit',
  async ({ id, ...body }, thunkAPI) => {
    try {
      const { data } = await instance.patch(`/words/edit/${id}`, body);
      return data;
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

// DELETE /words/:id
export const deleteWord = createAsyncThunk(
  'words/delete',
  async (id, thunkAPI) => {
    try {
      await instance.delete(`/words/${id}`);
      return id;
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

// POST /words/add/:id -- add a recommended word to own dictionary
export const addWordToDictionary = createAsyncThunk(
  'words/addToDictionary',
  async (id, thunkAPI) => {
    try {
      const { data } = await instance.post(`/words/add/${id}`);
      return data;
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

// GET /words/tasks -- training tasks list
export const fetchTrainingTasks = createAsyncThunk(
  'words/fetchTrainingTasks',
  async (params, thunkAPI) => {
    try {
      const { data } = await instance.get('/words/tasks', { params });
      return data;
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

// POST /words/tasks -- submit training answers array
export const sendTrainingAnswers = createAsyncThunk(
  'words/sendTrainingAnswers',
  async (answers, thunkAPI) => {
    try {
      const { data } = await instance.post('/words/tasks', { answers });
      return data;
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);
