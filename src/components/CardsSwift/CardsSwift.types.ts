export interface CardsSwiftProps {
  activeIndex: number;
  data: Array<any>;
  renderItem: (item: any, index: number, activeIndex: number) => JSX.Element;
  renderPlaceHolderItem?: (
    item: any,
    index: number,
    activeIndex: number
  ) => JSX.Element;
  height?: number | string;
  onSwiftRight?: () => void;
  onSwiftLeft?: () => void;
  itemToShow?: number;
  speed?: number;
}
