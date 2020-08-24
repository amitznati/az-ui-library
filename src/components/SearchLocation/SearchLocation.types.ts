export interface LocationItem {
  name: string;
  coords: {
    lon: number;
    lat: number;
  };
}
export interface SearchLocationProps {
  onSearch: (string) => void;
  searchResults?: Array<LocationItem>;
  onSelectLocation: (LocationItem) => void;
  selectedLocation?: LocationItem;
  onSearchMyLocation?: () => void;
}
