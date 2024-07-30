// src/components/StockList/StockList.styles.ts
import { StyleSheet } from 'react-native';
import colors from '../../utils/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg100,
    padding: 16,
  },
  pickerContainer: {
    marginBottom: 16,
    zIndex: 10,
  },
  pickerWrapper: {
    marginBottom: 16,
  },
  pickerLabel: {
    color: colors.text100,
    marginBottom: 8,
    fontSize: 16,
  },
  picker: {
    backgroundColor: colors.bg200,
    borderColor: colors.primary200,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  chartTitle: {
    color: colors.text100,
    fontSize: 18,
    fontWeight: 'bold',
  },
  dataContainer: {
    backgroundColor: colors.bg200,
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    maxHeight: 150,
  },
  text: {
    color: colors.text100,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  item: {
    backgroundColor: colors.bg200,
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: colors.bg200,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    color: colors.text100,
    marginBottom: 16,
    fontSize: 18,
  },
});
