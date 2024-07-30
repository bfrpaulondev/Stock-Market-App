// src/redux/slices/stockSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface StockState {
  data: { [key: string]: { [key: string]: string } };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StockState = {
  data: {},
  status: 'idle',
  error: null,
};

export const fetchStockData = createAsyncThunk(
  'stock/fetchStockData',
  async (params: { fromCurrency: string; toCurrency: string }) => {
    const response = await axios.get(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${params.fromCurrency}&to_symbol=${params.toCurrency}&apikey=receivedkeyhere`);
    return response.data['Time Series FX (Daily)'];
  }
);

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload || {};
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default stockSlice.reducer;
