import React, { CSSProperties } from 'react';

import { CardsSwiftProps } from './CardsSwift.types';

import './CardsSwift.scss';

const CardsSwift: React.FC<CardsSwiftProps> = ({
  data,
  activeIndex,
  renderItem,
  height,
  onSwiftRight,
  onSwiftLeft,
  renderPlaceHolderItem,
  itemToShow = 5
}) => {
  // const getItemClass = (index: number) =>
  //   activeIndex - index >= 0
  //     ? `up${activeIndex - index}`
  //     : `down${index - activeIndex}`;
  const [state, setState] = React.useState({
    startPoint: { x: 0 },
    moving: false
  });
  const stopMoving = (): void => {
    setState({
      startPoint: { x: 0 },
      moving: false
    });
  };
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    setState({
      startPoint: { x: e.touches[0].pageX },
      moving: true
    });
  };
  const onTouchEnd = (): void => {
    stopMoving();
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    if (state.moving) {
      if (e.touches[0].pageX - state.startPoint.x > 100) {
        stopMoving();
        onSwiftLeft && onSwiftLeft();
      } else if (e.touches[0].pageX - state.startPoint.x < -100) {
        stopMoving();
        onSwiftRight && onSwiftRight();
      }
    }
  };
  const getItemStyle = (index: number): CSSProperties => {
    const ratio = Math.min(itemToShow, Math.abs(activeIndex - index));
    const isBig = index > activeIndex;
    return {
      opacity: `${1 - ratio * 0.1}`,
      left: `${
        ratio !== 0
          ? `calc(${isBig ? '-' : ''}5px + ${
              isBig ? `-7% - ${ratio}%` : `17% + ${ratio}%`
            })`
          : '5%'
      }`,
      zIndex: 100 - ratio,
      transform: `${
        ratio !== 0
          ? `rotate3d(0, 1, 0, ${
              isBig ? '10deg' : '-10deg'
            }) scale3d(0.7, 0.9, 1)`
          : ''
      }`
    };
  };
  return (
    <div style={{ height }} className="cards-swift-container">
      <div className="cards-swift">
        {data.map((item, i) =>
          Math.abs(activeIndex - i) > itemToShow + 1 ? null : (
            <div
              key={`cards-swift-card-${i}`}
              className="cards-swift--item"
              style={getItemStyle(i)}
              onTouchStart={onSwiftLeft && onSwiftRight && onTouchStart}
              onTouchEnd={onSwiftLeft && onSwiftRight && onTouchEnd}
              onTouchMove={onSwiftLeft && onSwiftRight && onTouchMove}
            >
              {renderPlaceHolderItem && Math.abs(activeIndex - i) > 1
                ? renderPlaceHolderItem(item, i, activeIndex)
                : renderItem(item, i, activeIndex)}
            </div>
          )
        )}
      </div>
    </div>
  );
};
export default CardsSwift;
