import React from 'react';
import DayTimeItem from './DayTimeItem';

export default {
  title: 'DayTimeItem',
  component: DayTimeItem
};
export const all = () => (
  <div>
    <div>
      <p>With description</p>
      <DayTimeItem
        hour="06:42"
        name="עלות השחר"
        desc={'עלות השחר לפי הגר"א מחושבים לפי 72 דק זמניות לפני זריחה'}
      />
    </div>
    <div>
      <p>Without description</p>
      <DayTimeItem hour="12:42" name="חצות" />
    </div>
    <div>
      <p>in Day Time</p>
      <DayTimeItem hour="12:42" name="עלות השחר 90 דק" inDayTime />
    </div>
    <div>
      <p>in Night Time</p>
      <DayTimeItem hour="12:42" name="צאת הכוכבים" inNightTime />
    </div>
  </div>
);

export const WithDesc = () => (
  <DayTimeItem
    hour="06:42"
    name="עלות השחר"
    desc={'עלות השחר לפי הגר"א מחושבים לפי 72 דק זמניות לפני זריחה'}
  />
);
export const NoDesc = () => <DayTimeItem hour="06:42" name="עלות השחר" />;
