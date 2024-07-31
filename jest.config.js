module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transformIgnorePatterns: [
      'node_modules/(?!((jest-)?react-native|@react-native|react-navigation|react-native-swiper|react-native-vector-icons|@react-native-picker|@react-navigation/native-stack)/)',
    ],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  };
  