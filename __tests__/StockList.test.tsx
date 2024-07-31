import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import moment from 'moment';
import StockList from '../src/components/StockList/StockList';
import { fetchStockData } from '../src/redux/slices/stockSlice';
import { Alert } from 'react-native/Libraries/Alert/Alert';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

describe('StockList', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      stock: {
        data: {
          '2024-07-01': {
            '1. open': '1.10',
            '2. high': '1.15',
            '3. low': '1.05',
            '4. close': '1.12',
          },
        },
        status: 'idle',
        error: null,
      },
    });

    const data = {
      'Time Series FX (Daily)': {
        '2024-07-01': {
          '1. open': '1.10',
          '2. high': '1.15',
          '3. low': '1.05',
          '4. close': '1.12',
        },
      },
    };

    mock.onGet(/https:\/\/www\.alphavantage\.co\/query.*/).reply(200, data);
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <StockList />
      </Provider>
    );

    expect(getByText('Exchange Rate for ' + moment().format('YYYY-MM'))).toBeTruthy();
  });

  it('displays error when from and to currencies are the same', () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <StockList />
      </Provider>
    );

  fireEvent.changeText(getByLabelText('From:'), 'USD');
  fireEvent.changeText(getByLabelText('To:'), 'USD');

    waitFor(() => {
      expect(console).toHaveBeenCalledWith('Error', 'From and To currencies cannot be the same.');
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'From and To currencies cannot be the same.');
    });
  });

  it('refreshes data on refresh button press', async () => {
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <StockList />
      </Provider>
    );

    const refreshButton = getByRole('button', { name: /refresh/i });

    fireEvent.press(refreshButton);

    await waitFor(() => {
      expect(console).toHaveBeenCalledWith('Updated', 'Data has been updated.');
      expect(Alert.alert).toHaveBeenCalledWith('Updated', 'Data has been updated.');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

