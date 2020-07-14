import React from 'react';

// eslint-disable-next-line no-unused-vars
import { CalenderProps } from './Calender.types';

import './Calender.scss';

const Calender: React.FC<CalenderProps> = ({ calenderWeeks }) => (
  <div className="calendar-container">
    <div className="calendar-header">
      <h1 className="calendar-header-month">November/כסלו</h1>
      <p className="calendar-header-year">2018</p>
    </div>
    <div className="calendar">
      <div className="calendar-week calendar-week-days">
        <span className="day-name">ראשון</span>
        <span className="day-name">שני</span>
        <span className="day-name">שלישי</span>
        <span className="day-name">רביעי</span>
        <span className="day-name">חמישי</span>
        <span className="day-name">שישי</span>
        <span className="day-name">שבת</span>
      </div>
      {calenderWeeks.map((week, i) => {
        return (
          <div key={`week-${i}`} className="calendar-week">
            {week.map((day) => {
              return (
                <div
                  key={day.key}
                  className={`day${day.isDisable ? ' day--disabled' : ''}`}
                >
                  <span>{day.date.day}</span>
                  <span>{day.heDate}</span>
                  <span>{day.eventText}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  </div>
);

export default Calender;
