// src/screens/HomeScreen/HomeScreen.styles.ts
import { StyleSheet } from 'react-native';
import colors from '../../utils/theme';

export default StyleSheet.create({
  container: {
    paddingTop: 36,
    flexGrow: 1,
    backgroundColor: colors.bg100,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text100,
    marginBottom: 16,
    textAlign: 'center',
  },
});
