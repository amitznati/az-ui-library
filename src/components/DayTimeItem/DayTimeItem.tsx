import React from 'react';

import { DayTimeItemProps } from './DayTimeItem.types';
import './DayTimeItem.scss';

const DayTimeItem: React.FC<DayTimeItemProps> = ({
  hour,
  name,
  desc,
  className,
  inDayTime,
  inNightTime,
  ...rest
}) => (
  <div className={`day-time-item ${inDayTime ? 'inDay' : ''} ${inNightTime ? 'inNight' : ''} ${className || ''}`} {...rest}>
    <div className="day-time-item-hour">{hour}</div>
    <div className="day-time-item-text-wrap">
      <div className="day-time-item-name">{name}</div>
      {desc && <div className="day-time-item-desc">{desc}</div>}
    </div>
  </div>
);

export default DayTimeItem;
