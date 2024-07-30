// src/components/StockList/StockList.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, RefreshControl, TouchableOpacity, FlatList, Modal, Button, Alert, Animated, ScrollView } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchStockData } from '../../redux/slices/stockSlice';
import styles from './StockList.styles';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useWindowDimensions } from 'react-native';
import colors from '../../utils/theme';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

const StockList: React.FC = () => {
  const dispatch = useAppDispatch();
  const stockData = useAppSelector((state) => state.stock.data);
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'));
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const windowWidth = useWindowDimensions().width;
  const rotation = new Animated.Value(0);

  useEffect(() => {
    dispatch(fetchStockData({ fromCurrency, toCurrency }));
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (fromCurrency === toCurrency) {
      Alert.alert('Error', 'From and To currencies cannot be the same.');
      setFromCurrency('EUR');
      setToCurrency('USD');
    }
  }, [fromCurrency, toCurrency]);

  const stockEntries = Object.entries(stockData).map(([date, values]) => ({
    date,
    ...values,
  })).filter(entry => moment(entry.date).format('YYYY-MM') === selectedMonth).sort((a, b) => moment(a.date).diff(moment(b.date)));

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
    dispatch(fetchStockData({ fromCurrency, toCurrency })).finally(() => {
      setRefreshing(false);
      Animated.timing(rotation).stop();
      rotation.setValue(0);
      Alert.alert('Updated', 'Data has been updated.');
    });
  }, [dispatch, fromCurrency, toCurrency]);

  const resetSettings = () => {
    setFromCurrency('EUR');
    setToCurrency('USD');
    setSelectedMonth(moment().format('YYYY-MM'));
    setModalVisible(false);
  };

  const animatedStyle = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  if (!stockEntries || stockEntries.length === 0) {
    return (
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>No data available</Text>
            <Button title="X" onPress={resetSettings} />
          </View>
        </View>
      </Modal>
    );
  }

  const renderHeader = () => (
    <View style={styles.pickerContainer}>
      <View style={styles.pickerWrapper}>
        <Text style={styles.pickerLabel}>Month:</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            style={styles.picker}
          >
            {Array.from(new Set(Object.keys(stockData).map(date => moment(date).format('YYYY-MM')))).map(month => (
              <Picker.Item key={month} label={month} value={month} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.pickerWrapper}>
        <Text style={styles.pickerLabel}>From:</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={fromCurrency}
            onValueChange={(itemValue) => setFromCurrency(itemValue)}
            style={styles.picker}
          >
            {[
              { label: 'EUR', value: 'EUR' },
              { label: 'USD', value: 'USD' },
              { label: 'GBP', value: 'GBP' },
            ].map((currency) => (
              <Picker.Item key={currency.value} label={currency.label} value={currency.value} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.pickerWrapper}>
        <Text style={styles.pickerLabel}>To:</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={toCurrency}
            onValueChange={(itemValue) => setToCurrency(itemValue)}
            style={styles.picker}
          >
            {[
              { label: 'EUR', value: 'EUR' },
              { label: 'USD', value: 'USD' },
              { label: 'GBP', value: 'GBP' },
            ].map((currency) => (
              <Picker.Item key={currency.value} label={currency.label} value={currency.value} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );

  const renderFooter = () => {
    const highestEntry = stockEntries.reduce((prev, current) => (parseFloat(prev['2. high']) > parseFloat(current['2. high']) ? prev : current));
    const lowestEntry = stockEntries.reduce((prev, current) => (parseFloat(prev['3. low']) < parseFloat(current['3. low']) ? prev : current));
    const openingEntry = stockEntries[0];
    const closingEntry = stockEntries[stockEntries.length - 1];

    return (
      <View>
        <View style={styles.chartHeader}>
          <View>
            <Text style={styles.chartTitle}>Exchange Rate for {selectedMonth}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={onRefresh}>
              <Animated.View style={animatedStyle}>
                <Icon name="refresh" size={24} color={colors.primary200} />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>

        <LineChart
          data={{
            datasets: [
              {
                data: stockEntries.map(entry => parseFloat(entry['4. close'])),
                color: () => colors.primary200, 
              },
            ],
          }}
          width={windowWidth * 0.9} 
          height={220}
          chartConfig={{
            backgroundColor: colors.bg100,
            backgroundGradientFrom: colors.bg100,
            backgroundGradientTo: colors.bg100,
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={styles.chart}
        />

        <View style={styles.dataContainer}>
          <Text style={styles.text}>Highest: {highestEntry['2. high']} (on {highestEntry.date})</Text>
          <Text style={styles.text}>Lowest: {lowestEntry['3. low']} (on {lowestEntry.date})</Text>
          <Text style={styles.text}>Opening: {openingEntry['1. open']} (on {openingEntry.date})</Text>
          <Text style={styles.text}>Closing: {closingEntry['4. close']} (on {closingEntry.date})</Text>
        </View>

        <FlatList
          data={stockEntries}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>Date: {item.date}</Text>
              <Text style={styles.text}>Open: {item['1. open']}</Text>
              <Text style={styles.text}>High: {item['2. high']}</Text>
              <Text style={styles.text}>Low: {item['3. low']}</Text>
              <Text style={styles.text}>Close: {item['4. close']}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default React.memo(StockList);
