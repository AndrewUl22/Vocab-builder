import { createSlice } from '@reduxjs/toolkit';
import {
  fetchStatistics,
  fetchWords,
  fetchRecommendedWords,
  addWord,
  editWord,
  deleteWord,
  addToDictionary,
} from './operations';

// backend uses _id, normalize to id so the rest of the app does not care
const normalizeWord = (word) => ({ ...word, id: word.id ?? word._id });

const initialState = {
  filters: {
    keyword: '',
    category: '',
    isIrregular: undefined,
  },
  page: 1,

  items: [],
  totalPages: 1,
  isLoading: false,
  error: null,

  recommended: {
    items: [],
    page: 1,
    totalPages: 1,
    isLoading: false,
    error: null,
  },

  isMutating: false,
  mutationError: null,

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
    setRecommendedPage(state, action) {
      state.recommended.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // own dictionary
      .addCase(fetchWords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results.map(normalizeWord);
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // recommend list
      .addCase(fetchRecommendedWords.pending, (state) => {
        state.recommended.isLoading = true;
        state.recommended.error = null;
      })
      .addCase(fetchRecommendedWords.fulfilled, (state, action) => {
        state.recommended.isLoading = false;
        state.recommended.items = action.payload.results.map(normalizeWord);
        state.recommended.totalPages = action.payload.totalPages;
      })
      .addCase(fetchRecommendedWords.rejected, (state, action) => {
        state.recommended.isLoading = false;
        state.recommended.error = action.payload;
      })

      // add word
      .addCase(addWord.pending, (state) => {
        state.isMutating = true;
        state.mutationError = null;
      })
      .addCase(addWord.fulfilled, (state) => {
        state.isMutating = false;
        // page refetches the list after a successful add
      })
      .addCase(addWord.rejected, (state, action) => {
        state.isMutating = false;
        state.mutationError = action.payload;
      })

      // edit word
      .addCase(editWord.pending, (state) => {
        state.isMutating = true;
        state.mutationError = null;
      })
      .addCase(editWord.fulfilled, (state, action) => {
        state.isMutating = false;
        const updated = normalizeWord(action.payload);
        const index = state.items.findIndex((word) => word.id === updated.id);
        if (index !== -1) state.items[index] = updated;
      })
      .addCase(editWord.rejected, (state, action) => {
        state.isMutating = false;
        state.mutationError = action.payload;
      })

      // delete word
      .addCase(deleteWord.fulfilled, (state, action) => {
        state.items = state.items.filter((word) => word.id !== action.payload);
      })

      // add to dictionary, from Recommend page
      .addCase(addToDictionary.fulfilled, (state, action) => {
        state.recommended.items = state.recommended.items.filter(
          (word) => word.id !== action.meta.arg
        );
      })

      // statistics
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

export const { setKeyword, setCategory, setIsIrregular, setPage, setRecommendedPage } =
  wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;

export const selectFilters = (state) => state.words.filters;
export const selectPage = (state) => state.words.page;
export const selectWords = (state) => state.words.items;
export const selectTotalPages = (state) => state.words.totalPages;
export const selectIsWordsLoading = (state) => state.words.isLoading;
export const selectIsMutating = (state) => state.words.isMutating;

export const selectRecommendedWords = (state) => state.words.recommended.items;
export const selectRecommendedPage = (state) => state.words.recommended.page;
export const selectRecommendedTotalPages = (state) => state.words.recommended.totalPages;
export const selectIsRecommendedLoading = (state) => state.words.recommended.isLoading;

export const selectStatistics = (state) => state.words.statistics;
export const selectIsStatisticsLoading = (state) => state.words.isStatisticsLoading;
