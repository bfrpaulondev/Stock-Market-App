import { StyleSheet } from 'react-native';
import colors from '../../utils/theme';

export default StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg100,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text100,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: colors.text200,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  swipeHint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  swipeHintText: {
    fontSize: 16,
    color: colors.primary200,
    marginRight: 10,
  },
  dot: {
    backgroundColor: colors.text200,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: colors.primary200,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});
