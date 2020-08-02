import React from 'react';
import { addDecorator } from '@storybook/react';
import './_stories-styles.scss';
import ThemeProvider from '../src/components/ThemeProvider/ThemeProvider';
import CssBaseLine from '../src/components/CssBaseLine/CssBaseLine';

const StorybookWrapper = (storyFn) => {
  return (
    <ThemeProvider>
      <CssBaseLine />
      <div className="story-wrap">
        {storyFn()}
      </div>
    </ThemeProvider>
  )
}
addDecorator(StorybookWrapper);
