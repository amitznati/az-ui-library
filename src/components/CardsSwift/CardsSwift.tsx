import React from 'react';

import { CardsSwiftProps } from './CardsSwift.types';

import './CardsSwift.scss';

const CardsSwift: React.FC<CardsSwiftProps> = ({
  data,
  activeIndex,
  renderItem,
  height
}) => {
  const getItemClass = (index: number) =>
    activeIndex - index >= 0
      ? `up${activeIndex - index}`
      : `down${index - activeIndex}`;
  return (
    <div style={{ height }} className="cards-swift-container">
      <div className="cards-swift">
        {data.map((item, i) => (
          <div
            key={`cards-swift-card-${i}`}
            className={`cards-swift--item active-${getItemClass(i)}`}
          >
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    </div>
  );
};
export default CardsSwift;
