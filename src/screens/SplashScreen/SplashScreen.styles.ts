import { StyleSheet } from 'react-native';
import colors from '../../utils/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
  },
  text: {
    color: colors.text100,
    fontSize: 24,
  },
  title: {
    color: colors.primary200,
    fontSize: 28,
    fontWeight: 'bold',
  },
});
