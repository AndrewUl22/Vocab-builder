import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/es/storage';

import { authReducer } from './auth/slice';
import { categoriesReducer } from './categories/slice';
import { wordsReducer } from './words/slice';

const authPersistConfig = { key: 'auth', storage, whitelist: ['token'] };

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  categories: categoriesReducer,
  words: wordsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }),
});

export const persistor = persistStore(store);
