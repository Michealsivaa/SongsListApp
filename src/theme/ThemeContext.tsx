import React, {createContext, useState, useContext} from 'react';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';
import {AppTheme} from './Theme';

interface ThemeContextType {
  theme: AppTheme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme, // default theme object
  toggleTheme: () => {}, // no-op
  isDark: false,
});

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, isDark}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
