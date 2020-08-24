import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export default function MaterialThemeProvider({
  children,
  defaultTheme
}): JSX.Element {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: defaultTheme.colors.primary,
        light: defaultTheme.colors.primaryLight,
        dark: defaultTheme.colors.primaryDark
      },
      secondary: {
        main: defaultTheme.colors.secondary,
        light: defaultTheme.colors.secondaryLight,
        dark: defaultTheme.colors.secondaryDark
      }
    },
    direction: defaultTheme.direction,
    typography: {
      htmlFontSize: 10,
      fontFamily: defaultTheme.fontFamily.join(', '),
      fontSize: 20
    }
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
