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
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [activeIndex, setActiveIndex] = React.useState(5);
  const renderItem = (item: JSX.Element, index: number): JSX.Element => {
    return (
      <div
        style={{
          margin: 'auto',
          boxShadow: '0 1px 4px black',
          height: '100%',
          backgroundColor: 'orangered',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '10rem'
        }}
      >
        {item} - {index}
      </div>
    );
  };
  return (
    <div>
      <CardsSwift
        data={data}
        renderItem={renderItem}
        activeIndex={activeIndex}
      />
      <div className="cards-swift-stories-buttons">
        <span onClick={() => setActiveIndex(activeIndex + 1)}>+</span>
        <span onClick={() => setActiveIndex(activeIndex - 1)}>-</span>
      </div>
    </div>
  );
};
