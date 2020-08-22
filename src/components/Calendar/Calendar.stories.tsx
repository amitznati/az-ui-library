import React from 'react';
import Calendar_new from './Calendar';
// import { July2020 } from './Calendar.mock';
export default {
  title: 'Calendar',
  component: Calendar_new
};

export const HebrewGregCalendar = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  return (
    <Calendar_new selectedDate={selectedDate} onSelectDate={setSelectedDate} />
  );
};

export const AutoClose = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  return (
    <Calendar_new
      selectedDate={selectedDate}
      onSelectDate={setSelectedDate}
      autoCloseOnSelect
    />
  );
};
