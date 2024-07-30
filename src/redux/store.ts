// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './slices/currencySlice';
import stockReducer from './slices/stockSlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    stock: stockReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
