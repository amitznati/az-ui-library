import React from 'react';

import { SearchLocationProps } from './SearchLocation.types';

import './SearchLocation.scss';

const SearchLocation: React.FC<SearchLocationProps> = ({ foo }) => (
  <div data-testid="SearchLocation" className="foo-bar">
    {foo}
  </div>
);

export default SearchLocation;
