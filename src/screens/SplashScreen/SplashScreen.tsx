import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './SplashScreen.styles';

const SplashScreenComponent: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('IntroScreen');
    }, 1000); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/splash-icon.png')} style={styles.icon}  testID="splash-icon"  />
      <Text style={styles.text}>Welcome to</Text>
      <Text style={styles.title}>Stocks</Text>
    </View>
  );
};

export default SplashScreenComponent;
