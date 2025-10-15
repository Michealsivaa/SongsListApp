import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import AppNavigator from '../navigation/AppNavigator';
import {ThemeProvider, useThemeContext} from '../theme/ThemeContext';
import Toast from 'react-native-toast-message';

const AppContent = () => {
  const {isDark} = useThemeContext();

  return (
    <>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <AppNavigator />
      </NavigationContainer>
      <Toast />
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
