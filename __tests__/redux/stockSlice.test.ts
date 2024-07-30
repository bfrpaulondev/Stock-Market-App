import stockReducer, { fetchStockData } from '../../src/redux/slices/stockSlice';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mock = new MockAdapter(axios);

describe('stockSlice', () => {
  afterEach(() => {
    mock.reset();
  });

  it('handles fetchStockData', async () => {
    const store = mockStore({ stock: { data: {}, status: 'idle', error: null } });
    const data = { 'Time Series FX (Daily)': { '2024-07-01': { '1. open': '1.10', '2. high': '1.15', '3. low': '1.05', '4. close': '1.12' } } };
    mock.onGet('https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo').reply(200, data);

    await store.dispatch(fetchStockData({ fromCurrency: 'EUR', toCurrency: 'USD' }));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchStockData.pending.type);
    expect(actions[1].type).toEqual(fetchStockData.fulfilled.type);
    expect(actions[1].payload).toEqual(data['Time Series FX (Daily)']);
  });
});
