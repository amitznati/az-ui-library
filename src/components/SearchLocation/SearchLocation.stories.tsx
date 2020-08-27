import React from 'react';
import SearchLocation from './SearchLocation';
import { LocationItem } from './SearchLocation.types';

export default {
  title: 'SearchLocation'
};

export const simpleSearchLocation = () => {
  const locations = [
    { formattedName: 'דימנה', coords: { latitude: 123, longitude: 342 } },
    { formattedName: 'תל אביב', coords: { latitude: 1232, longitude: 342 } },
    { formattedName: 'ירושלים', coords: { latitude: 1233, longitude: 342 } },
    { formattedName: 'New York', coords: { latitude: 1234, longitude: 342 } }
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
