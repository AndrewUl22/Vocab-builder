import { createSlice } from '@reduxjs/toolkit';
import { fetchStatistics } from './operations';

const initialState = {
  filters: {
    keyword: '',
    category: '',
    isIrregular: undefined,
  },
  page: 1,

  statistics: null,
  isStatisticsLoading: false,
  statisticsError: null,
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setKeyword(state, action) {
      state.filters.keyword = action.payload;
      state.page = 1;
    },
    setCategory(state, action) {
      state.filters.category = action.payload;
      state.filters.isIrregular = undefined;
      state.page = 1;
    },
    setIsIrregular(state, action) {
      state.filters.isIrregular = action.payload;
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.isStatisticsLoading = true;
        state.statisticsError = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.isStatisticsLoading = false;
        state.statistics = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.isStatisticsLoading = false;
        state.statisticsError = action.payload;
      });
  },
});

export const { setKeyword, setCategory, setIsIrregular, setPage } = wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;

export const selectFilters = (state) => state.words.filters;
export const selectPage = (state) => state.words.page;
export const selectStatistics = (state) => state.words.statistics;
export const selectIsStatisticsLoading = (state) => state.words.isStatisticsLoading;
