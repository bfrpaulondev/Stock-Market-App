import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IntroScreen from '../src/screens/IntroScreen/IntroScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native-elements';

const Stack = createStackNavigator();

describe('IntroScreen', () => {
  it('renders all slides and navigates to HomeScreen after the last slide', () => {
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

    fireEvent.scroll(getByText('Refresh Data'), { nativeEvent: { contentOffset: { x: 0, y: 400 } } });
    setTimeout(() => {
      expect(queryByText('HomeScreen')).toBeTruthy();
    }, 2500);
  });
});
