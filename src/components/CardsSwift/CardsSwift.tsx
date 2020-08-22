import React from 'react';
import { CardsSwiftProps } from './CardsSwift.types';
import styled from 'styled-components';

const getItemStyle = (props): string => {
  const { index, itemToShow, activeIndex, speed = 0.5 } = props;
  const ratio = Math.min(itemToShow, Math.abs(activeIndex - index));
  const isBig = index > activeIndex;
  return `
      transition: all ${speed}s;
      width: ${100 - itemToShow * 2}%;
      opacity: ${1 - ratio * 0.1};
      left: ${
        ratio !== 0
          ? `calc(${isBig ? '-' : ''}${itemToShow}px + ${
              isBig
                ? `-${14.5 - itemToShow * 1.5}% - ${ratio}%`
                : `${14.5 + itemToShow / 2}% + ${ratio}%`
            })`
          : `${itemToShow}%`
      };
      z-index: ${100 - ratio};
      transform: ${
        ratio !== 0
          ? `rotate3d(0, 1, 0, ${
              isBig ? '10deg' : '-10deg'
            }) scale3d(0.7, 0.9, 1)`
          : ''
      };
    `;
};

const StyledCardsSwiftContainer = styled.div`
  width: 100%;
`;
const StyledCardsSwift = styled.div`
  position: relative;
  display: inline-flex;
  perspective: 1500px;
  width: 100%;
  height: 100%;
`;
const StyledCardsSwiftItem = styled.div`
  position: absolute;
  height: 100%;
  display: inline-table;
  ${(props): string => getItemStyle(props)}
`;

const CardsSwift: React.FC<CardsSwiftProps> = ({
  data,
  activeIndex,
  renderItem,
  height,
  onSwiftRight,
  onSwiftLeft,
  renderPlaceHolderItem,
  itemToShow = 5,
  speed = 0.5
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
  return (
    <StyledCardsSwiftContainer style={height ? { height } : {}}>
      <StyledCardsSwift>
        {data.map((item, i) =>
          Math.abs(activeIndex - i) > itemToShow ? null : (
            <StyledCardsSwiftItem
              key={`cards-swift-card-${i}`}
              index={i}
              speed={speed}
              activeIndex={activeIndex}
              itemToShow={itemToShow}
              onTouchStart={onSwiftLeft && onSwiftRight && onTouchStart}
              onTouchEnd={onSwiftLeft && onSwiftRight && onTouchEnd}
              onTouchMove={onSwiftLeft && onSwiftRight && onTouchMove}
            >
              {renderPlaceHolderItem && Math.abs(activeIndex - i) > 1
                ? renderPlaceHolderItem(item, i, activeIndex)
                : renderItem(item, i, activeIndex)}
            </StyledCardsSwiftItem>
          )
        )}
      </StyledCardsSwift>
    </StyledCardsSwiftContainer>
  );
};
export default CardsSwift;
