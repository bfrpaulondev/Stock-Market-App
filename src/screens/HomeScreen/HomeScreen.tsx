// src/screens/HomeScreen/HomeScreen.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import StockList from '../../components/StockList/StockList';
import styles from './HomeScreen.styles';

const HomeScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Market Data</Text>
      <StockList />
    </ScrollView>
  );
};

export default HomeScreen;
