import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import SplashScreenComponent from './src/screens/SplashScreen/SplashScreen';
import IntroScreen from './src/screens/IntroScreen/IntroScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreenComponent} />
          <Stack.Screen name="IntroScreen" component={IntroScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
