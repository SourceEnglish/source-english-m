import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

// Define Theme Type
interface Theme {
  backgroundColor: string;
  textColor: string;
  highlightColor: string;
}

// Define Context Type
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Default light and dark themes
const lightTheme: Theme = {
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  highlightColor: '#8B8000',
};

const darkTheme: Theme = {
  backgroundColor: '#121212',
  textColor: '#FFFFFF',
  highlightColor: '#8B8000',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider
      value={{ theme: isDark ? darkTheme : lightTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
