export interface CardsSwiftProps {
  activeIndex: number;
  data: Array<any>;
  renderItem: (item: JSX.Element, index: number) => JSX.Element;
  height: number;
  onSwiftRight: () => void;
  onSwiftLeft: () => void;
}
