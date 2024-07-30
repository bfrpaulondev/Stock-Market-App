import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import StockList from '../src/components/StockList/StockList';
import { fetchStockData } from '../src/redux/slices/stockSlice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../src/redux/slices/stockSlice', () => ({
  fetchStockData: jest.fn(),
}));

const initialState = {
  stock: {
    data: {
      '2024-07-01': { '1. open': '1.10', '2. high': '1.15', '3. low': '1.05', '4. close': '1.12' },
      '2024-07-02': { '1. open': '1.12', '2. high': '1.14', '3. low': '1.08', '4. close': '1.10' },
    },
    status: 'succeeded',
    error: null,
  },
};

describe('StockList', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders correctly with data', () => {
    const { getByText } = render(
      <Provider store={store}>
        <StockList />
      </Provider>
    );

    expect(getByText('Exchange Rate for 2024-07')).toBeTruthy();
    expect(getByText('Highest: 1.15 (on 2024-07-01)')).toBeTruthy();
    expect(getByText('Lowest: 1.05 (on 2024-07-01)')).toBeTruthy();
    expect(getByText('Opening: 1.10 (on 2024-07-01)')).toBeTruthy();
    expect(getByText('Closing: 1.10 (on 2024-07-02)')).toBeTruthy();
  });

  it('dispatches fetchStockData on refresh', async () => {
    fetchStockData.mockReturnValue({ type: 'stock/fetchStockData' });

    const { getByTestId } = render(
      <Provider store={store}>
        <StockList />
      </Provider>
    );

    fireEvent.press(getByTestId('refresh-button'));

    await waitFor(() => {
      expect(fetchStockData).toHaveBeenCalled();
    });
  });
});
