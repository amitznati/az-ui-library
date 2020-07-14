import React from 'react';
import Calender from './Calender';
import { July2020 } from './Calender.mock';
export default {
  title: 'Calender'
};

export const CalenderJuly2020 = () => <Calender calenderWeeks={July2020} />;
