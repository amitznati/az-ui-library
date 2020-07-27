import React from 'react';
import Calendar from './Calendar';
// import { July2020 } from './Calendar.mock';
export default {
  title: 'Calendar',
  component: Calendar
};

export const HebrewGregCalendar = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  return (
    <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
  );
};

export const AutoClose = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  return (
    <Calendar
      selectedDate={selectedDate}
      onSelectDate={setSelectedDate}
      autoCloseOnSelect
    />
  );
};
