import React from 'react';
import SearchInput from './SearchInput';
import { ThemeProvider } from '../../index';

export default {
  title: 'SearchInput'
};

export const simpleSearchInput = (): JSX.Element => {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <div style={{ width: '400px' }}>
      <SearchInput
        placeholder="חיפוש לפי עיר"
        onSearch={(v): void => setSearchValue(v)}
      />
      <p>Search Value: {searchValue}</p>
    </div>
  );
};

export const ltrSearchInput = (): JSX.Element => {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <div style={{ width: '400px' }}>
      <ThemeProvider theme={{ direction: 'ltr' }}>
        <SearchInput
          placeholder="Search city..."
          onSearch={(v): void => setSearchValue(v)}
        />
        <p>Search Value: {searchValue}</p>
      </ThemeProvider>
    </div>
  );
};
