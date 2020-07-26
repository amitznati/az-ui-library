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

const data: Array<number> = [];
for (let i = 0; i < 100; i += 1) data.push(i);

const renderItem = (item: JSX.Element, index: number): JSX.Element => {
  return (
    <div
      style={{
        boxShadow: '0 1px 4px black',
        height: '100%',
        backgroundColor: 'orangered',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '5rem'
      }}
    >
      <div>item {index} - out of 100</div>
      <div>{item}</div>
    </div>
  );
};

export const CardsSwiftDemo = () => {
  const [activeIndex, setActiveIndex] = React.useState(50);
  const moveUp = (): void => {
    setActiveIndex(activeIndex + 1);
  };
  const moveDown = (): void => {
    setActiveIndex(activeIndex - 1);
  };
  return (
    <div style={{ padding: '10rem' }}>
      <CardsSwift
        data={data}
        renderItem={renderItem}
        activeIndex={activeIndex}
        onSwiftLeft={moveUp}
        onSwiftRight={moveDown}
        height={400}
        itemToShow={5}
      />
      <div className="cards-swift-stories-buttons">
        <span onClick={moveUp}>+</span>
        <span onClick={moveDown}>-</span>
      </div>
    </div>
  );
};

export const FullScreen = () => {
  const [activeIndex, setActiveIndex] = React.useState(50);
  const moveUp = (): void => {
    setActiveIndex(activeIndex + 1);
  };
  const moveDown = (): void => {
    setActiveIndex(activeIndex - 1);
  };
  const navButtons = (): JSX.Element => (
    <div className="cards-swift-stories-buttons">
      <span onClick={moveUp}>+</span>
      <span onClick={moveDown}>-</span>
    </div>
  );
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <div style={{ width: '112%', transform: 'translateX(-5%)' }}>
        <CardsSwift
          data={data}
          renderItem={(item) => renderItem(navButtons(), item)}
          activeIndex={activeIndex}
          onSwiftLeft={moveUp}
          onSwiftRight={moveDown}
          height="100vh"
        />
      </div>
    </div>
  );
};
