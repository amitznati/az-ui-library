import React from 'react';
import { ThemeProvider as Theme } from 'styled-components';
import { ThemeProviderProps } from './ThemeProvider.types';
import defaultTheme from '../GlobalStyles/defaultTheme';

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = defaultTheme,
  children
}) => <Theme theme={theme}>{children}</Theme>;

export default ThemeProvider;
