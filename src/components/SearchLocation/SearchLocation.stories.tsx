import React from 'react';
import SearchLocation from './SearchLocation';
import { LocationItem } from './SearchLocation.types';

export default {
  title: 'SearchLocation'
};

export const simpleSearchLocation = () => {
  const locations = [
    { name: 'דימנה', coords: { lat: 123, lon: 342 } },
    { name: 'תל אביב', coords: { lat: 1232, lon: 342 } },
    { name: 'ירושלים', coords: { lat: 1233, lon: 342 } },
    { name: 'New York', coords: { lat: 1234, lon: 342 } }
  ];
  const [searchResults, setSearchResults] = React.useState<Array<LocationItem>>(
    []
  );
  const [selectedLocation, setSelectedLocation] = React.useState();
  return (
    <SearchLocation
      onSearch={(): void => setSearchResults(locations)}
      searchResults={searchResults}
      onSelectLocation={(loc): void => setSelectedLocation(loc)}
      selectedLocation={selectedLocation}
    />
  );
};
