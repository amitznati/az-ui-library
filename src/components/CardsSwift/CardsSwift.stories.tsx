import React from 'react';
import CardsSwift from './CardsSwift';

export default {
  title: 'CardsSwift',
  component: CardsSwift,
  decorators: [
    (story: () => React.ReactNode) => (
      <div className="cards-swift-stories">{story()}</div>
    )
  ]
};

export const CardsSwiftDemo = () => {
  const data = [];
  for (let i = 0; i < 100; i += 1) data.push(i);
  const [activeIndex, setActiveIndex] = React.useState(50);
  const renderItem = (item: JSX.Element): JSX.Element => {
    return (
      <div
        style={{
          boxShadow: '0 1px 4px black',
          height: '100%',
          backgroundColor: 'orangered',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '5rem'
        }}
      >
        item {item} - out of 100
      </div>
    );
  };
  const moveUp = (): void => {
    setActiveIndex(activeIndex + 1);
  };
  const moveDown = (): void => {
    setActiveIndex(activeIndex - 1);
  };
  return (
    <div>
      <CardsSwift
        data={data}
        renderItem={renderItem}
        activeIndex={activeIndex}
        onSwiftLeft={moveUp}
        onSwiftRight={moveDown}
        height={400}
      />
      <div className="cards-swift-stories-buttons">
        <span onClick={moveUp}>+</span>
        <span onClick={moveDown}>-</span>
      </div>
    </div>
  );
};
