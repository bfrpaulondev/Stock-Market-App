import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './IntroScreen.styles';
import colors from '../../utils/theme';

const IntroScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <Swiper loop={false} dotStyle={styles.dot} activeDotStyle={styles.activeDot}>
      <View style={styles.slide}>
        <Image source={require('../../assets/select-currency.png')} style={styles.icon} />
        <Text style={styles.title}>Select Currencies</Text>
        <Text style={styles.text}>Choose the currencies you want to compare from the dropdown menus.</Text>
        <View style={styles.swipeHint}>
          <Text style={styles.swipeHintText}>Swipe left to continue</Text>
          <Icon name="arrow-left" size={24} color={colors.primary200} />
        </View>
      </View>
      <View style={styles.slide}>
        <Image source={require('../../assets/view-history.png')} style={styles.icon} />
        <Text style={styles.title}>View Historical Data</Text>
        <Text style={styles.text}>See daily highs, lows, opening, and closing prices for the selected month.</Text>
        <View style={styles.swipeHint}>
          <Text style={styles.swipeHintText}>Swipe left to continue</Text>
          <Icon name="arrow-left" size={24} color={colors.primary200} />
        </View>
      </View>
      <View style={styles.slide}>
        <Image source={require('../../assets/refresh.png')} style={styles.icon} />
        <Text style={styles.title}>Refresh Data</Text>
        <Text style={styles.text}>Tap the refresh button to get the latest exchange rates.</Text>
        <Button title="Continue" onPress={handleContinue} color={colors.primary200} />
      </View>
    </Swiper>
  );
};

export default IntroScreen;
