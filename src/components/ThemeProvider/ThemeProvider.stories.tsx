import React from 'react';
import ThemeProvider from './ThemeProvider';
import { AppBar, Button } from '../../index';
import logo from '../../styles/assets/images/ic_launcher_round.png';

export default {
  title: 'ThemeProvider',
  component: ThemeProvider
};

export const ButtonsWithTheme = () => {
  const theme = {
    colors: {
      primary: '#30708e',
      primaryDark: '#214c63',
      primaryLight: '#598aa4',

      secondary: '#e83cc1',
      secondaryDark: '#5b115e',
      secondaryLight: '#e794ea',

      tertiary: '#79d239',
      tertiaryLight: '#caecb3',
      tertiaryDark: '#2d6107',

      white: '#ffffff',
      grey: '#777',
      grey2: '#eee',
      greyLight: '#f7f7f7',
      greyDark: '#535353',
      greyDark2: '#333',
      black: 'rgb(0, 0, 0)'
    },
    defaultColor: '#777',
    fontFamily: 'Assistant'
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        logoSrc={logo}
        title="ערכת נושה theme"
        navigationLinks={[
          { title: 'link 1', to: '#' },
          { title: 'link 2', to: '#' }
        ]}
      />
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="tertiary">tertiary</Button>
    </ThemeProvider>
  );
};
