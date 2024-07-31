import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen/HomeScreen';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import stockReducer from '../src/redux/slices/stockSlice';

const store = configureStore({ reducer: { stock: stockReducer } });

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    expect(getByText('Market Data')).toBeTruthy();
  });

  it('renders StockList component', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    expect(getByTestId('stock-list')).toBeTruthy();
  });
});
