import React from 'react';
import Accordion from './Accordion';
import { Button } from '../../index';

export default {
  title: 'Accordion'
};

export const WithBar = () => {
  return (
    <Accordion header="Accordion Header">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      <br />
      A architecto dignissimos eum,
      <br />
      ipsa molestiae molestias nostrum quisquam
      <br />
      reprehenderit unde velit! Aliquid assumenda dignissimos maxime modi
      <br />
      molestiae natus pariatur tenetur velit.
      <br />
      A architecto dignissimos eum,
      <br />
      ipsa molestiae molestias nostrum quisquam
      <br />
      reprehenderit unde velit! Aliquid assumenda dignissimos maxime modi
      <br />
      molestiae natus pariatur tenetur velit.
      <br />
      A architecto dignissimos eum,
      <br />
      ipsa molestiae molestias nostrum quisquam
      <br />
      reprehenderit unde velit! Aliquid assumenda dignissimos maxime modi
      <br />
      molestiae natus pariatur tenetur velit.
      <br />
      A architecto dignissimos eum,
      <br />
      ipsa molestiae molestias nostrum quisquam
      <br />
      reprehenderit unde velit! Aliquid assumenda dignissimos maxime modi
      <br />
      molestiae natus pariatur tenetur velit.
    </Accordion>
  );
};

export const dynamicHeight = () => {
  const dammyData = [
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    'A architecto dignissimos eum,',
    'ipsa molestiae molestias nostrum quisquam',
    'reprehenderit unde velit! Aliquid assumenda dignissimos maxime modi',
    'molestiae natus pariatur tenetur velit.',
    'A architecto dignissimos eum,',
    'ipsa molestiae molestias nostrum quisquam'
  ];
  const [items, setItems] = React.useState([...dammyData]);
  const onAddItems = () => {
    setItems([...items, ...dammyData]);
  };
  return (
    <Accordion header="Accordion Header">
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      <Button onClick={onAddItems}>Add Items</Button>
    </Accordion>
  );
};
