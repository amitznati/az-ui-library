import React from 'react';
import Calender from './Calender';
// import { July2020 } from './Calender.mock';
export default {
  title: 'Calender',
  component: Calender
};

export const HebrewGregCalendar = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  return (
    <Calender selectedDate={selectedDate} onSelectDate={setSelectedDate} />
  );
};

export const AutoClose = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  return (
    <Calender
      selectedDate={selectedDate}
      onSelectDate={setSelectedDate}
      autoCloseOnSelect
    />
  );
};
