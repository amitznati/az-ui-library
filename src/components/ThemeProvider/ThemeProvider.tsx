import React from 'react';
import { ThemeProvider as Theme } from 'styled-components';
import { ThemeProviderProps } from './ThemeProvider.types';
import defaultTheme from '../GlobalStyles/defaultTheme';

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = defaultTheme,
  children
}) => {
  const useTheme = { ...defaultTheme, ...theme };
  return <Theme theme={useTheme}>{children}</Theme>;
};

export default ThemeProvider;
