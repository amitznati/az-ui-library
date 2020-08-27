export interface LocationItem {
  formattedName: string;
  coords: {
    longitude: number;
    latitude: number;
  };
}
export interface SearchLocationProps {
  onSearch: (string) => void;
  searchResults?: Array<LocationItem>;
  onSelectLocation: (LocationItem) => void;
  selectedLocation?: LocationItem;
  onSearchMyLocation?: () => void;
}
