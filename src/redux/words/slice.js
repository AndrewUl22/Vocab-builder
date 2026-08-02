import { createSlice } from '@reduxjs/toolkit';
import {
  fetchOwnWords,
  fetchRecommendedWords,
  fetchStatistics,
  addWord,
  editWord,
  deleteWord,
  addWordToDictionary,
  fetchTrainingTasks,
  sendTrainingAnswers,
} from './operations';

// Shared shape reused by Dictionary page and Recommend page
// (both rely on the same universal WordsTable / WordsPagination components)
const emptyList = {
  items: [],
  page: 1,
  perPage: 7,
  totalPages: 1,
  isLoading: false,
  error: null,
};

const initialState = {
  dictionary: { ...emptyList },
  recommend: { ...emptyList },
  filters: { keyword: '', category: '', isIrregular: null },
  statistics: { totalCount: 0, needRepeat: 0, isLoading: false, error: null },
  training: {
    tasks: [],
    currentIndex: 0,
    answers: [],
    isLoading: false,
    error: null,
    result: null,
  },
};

const applyList = (listKey) => ({
  pending: (state) => {
    state[listKey].isLoading = true;
    state[listKey].error = null;
  },
  fulfilled: (state, action) => {
    state[listKey].isLoading = false;
    state[listKey].items = action.payload.results;
    state[listKey].page = action.payload.page;
    state[listKey].perPage = action.payload.perPage;
    state[listKey].totalPages = action.payload.totalPages;
  },
  rejected: (state, action) => {
    state[listKey].isLoading = false;
    state[listKey].error = action.payload;
  },
});

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setKeyword(state, action) {
      state.filters.keyword = action.payload;
    },
    setCategory(state, action) {
      state.filters.category = action.payload;
      state.filters.isIrregular = null;
    },
    setIsIrregular(state, action) {
      state.filters.isIrregular = action.payload;
    },
    setPage(state, action) {
      const { listKey, page } = action.payload;
      state[listKey].page = page;
    },
    setTrainingAnswer(state, action) {
      state.training.answers.push(action.payload);
    },
    nextTrainingTask(state) {
      state.training.currentIndex += 1;
    },
    resetTraining(state) {
      state.training.currentIndex = 0;
      state.training.answers = [];
      state.training.result = null;
    },
  },
  extraReducers: (builder) => {
    const dictionaryHandlers = applyList('dictionary');
    const recommendHandlers = applyList('recommend');

    builder
      .addCase(fetchOwnWords.pending, dictionaryHandlers.pending)
      .addCase(fetchOwnWords.fulfilled, dictionaryHandlers.fulfilled)
      .addCase(fetchOwnWords.rejected, dictionaryHandlers.rejected)

      .addCase(fetchRecommendedWords.pending, recommendHandlers.pending)
      .addCase(fetchRecommendedWords.fulfilled, recommendHandlers.fulfilled)
      .addCase(fetchRecommendedWords.rejected, recommendHandlers.rejected)

      .addCase(fetchStatistics.pending, (state) => {
        state.statistics.isLoading = true;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.statistics.isLoading = false;
        state.statistics.totalCount = action.payload.totalCount;
        state.statistics.needRepeat = action.payload.needRepeat;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.statistics.isLoading = false;
        state.statistics.error = action.payload;
      })

      // Mutations that succeed should refresh the dictionary list from
      // the page component (re-fetch), so slice only tracks error state here.
      .addCase(addWord.rejected, (state, action) => {
        state.dictionary.error = action.payload;
      })
      .addCase(editWord.rejected, (state, action) => {
        state.dictionary.error = action.payload;
      })
      .addCase(deleteWord.fulfilled, (state, action) => {
        state.dictionary.items = state.dictionary.items.filter(
          (w) => w._id !== action.payload
        );
      })
      .addCase(addWordToDictionary.rejected, (state, action) => {
        state.recommend.error = action.payload;
      })

      .addCase(fetchTrainingTasks.pending, (state) => {
        state.training.isLoading = true;
        state.training.error = null;
      })
      .addCase(fetchTrainingTasks.fulfilled, (state, action) => {
        state.training.isLoading = false;
        state.training.tasks = action.payload.tasks || action.payload;
        state.training.currentIndex = 0;
        state.training.answers = [];
      })
      .addCase(fetchTrainingTasks.rejected, (state, action) => {
        state.training.isLoading = false;
        state.training.error = action.payload;
      })
      .addCase(sendTrainingAnswers.fulfilled, (state, action) => {
        state.training.result = action.payload;
      })
      .addCase(sendTrainingAnswers.rejected, (state, action) => {
        state.training.error = action.payload;
      });
  },
});

export const wordsReducer = wordsSlice.reducer;
export const {
  setKeyword,
  setCategory,
  setIsIrregular,
  setPage,
  setTrainingAnswer,
  nextTrainingTask,
  resetTraining,
} = wordsSlice.actions;

export const selectDictionary = (state) => state.words.dictionary;
export const selectRecommend = (state) => state.words.recommend;
export const selectFilters = (state) => state.words.filters;
export const selectStatistics = (state) => state.words.statistics;
export const selectTraining = (state) => state.words.training;
