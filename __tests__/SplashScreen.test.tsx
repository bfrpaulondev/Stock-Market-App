import React from 'react';
import { render } from '@testing-library/react-native';
import SplashScreenComponent from '../src/screens/SplashScreen/SplashScreen';

jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
}));

describe('SplashScreenComponent', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<SplashScreenComponent />);
    expect(getByText('Welcome to')).toBeTruthy();
    expect(getByText('Stocks')).toBeTruthy();
    expect(getByTestId('splash-icon')).toBeTruthy();
  });
});
