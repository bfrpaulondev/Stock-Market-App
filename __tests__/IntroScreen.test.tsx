import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import IntroScreen from '../src/screens/IntroScreen/IntroScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

const Stack = createStackNavigator();

describe('IntroScreen', () => {
  it('renders all slides and navigates to HomeScreen after the last slide', async () => {
    const { getByText, queryByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="IntroScreen" component={IntroScreen} />
          <Stack.Screen name="HomeScreen" component={() => <Text>HomeScreen</Text>} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    expect(getByText('Select Currencies')).toBeTruthy();
    expect(getByText('View Historical Data')).toBeTruthy();
    expect(getByText('Refresh Data')).toBeTruthy();

    fireEvent.press(getByText('Continue'));

    await waitFor(() => {
      expect(queryByText('HomeScreen')).toBeTruthy();
    });
  });
});
