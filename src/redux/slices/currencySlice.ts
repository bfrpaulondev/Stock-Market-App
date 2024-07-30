// src/redux/slices/currencySlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface CurrencyState {
  fromCurrency: string;
  toCurrency: string;
}

const initialState: CurrencyState = {
  fromCurrency: 'EUR',
  toCurrency: 'USD',
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setFromCurrency(state, action) {
      state.fromCurrency = action.payload;
    },
    setToCurrency(state, action) {
      state.toCurrency = action.payload;
    },
  },
});

export const { setFromCurrency, setToCurrency } = currencySlice.actions;
export default currencySlice.reducer;
