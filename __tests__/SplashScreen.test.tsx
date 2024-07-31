import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreenComponent from '../src/screens/SplashScreen/SplashScreen';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('SplashScreenComponent', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <SplashScreenComponent />
      </NavigationContainer>
    );

    expect(getByTestId('splash-icon')).toBeTruthy();
  });
});
