import React from 'react';
import styled from 'styled-components';

import { DailyTimeLineProps } from './DailyTimeLine.types';
import DayTimeItem from '../DayTimeItem/DayTimeItem';
import { getColor } from '../GlobalStyles/utils';

const times: Array<string> = [];
for (let i = 0; i < 10; i += 1) times.push(`0${i}:00`);
for (let i = 10; i < 24; i += 1) times.push(`${i}:00`);
const getTimeTop = (time): number => {
  const [h, m] = time.split(':');
  return Number((h * 200 + (m / 60) * 200).toFixed(2));
};
const getNowTime = (): string => {
  const now = new Date();
  return `${now.getHours()}:${
    now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
  }`;
};

const getStyledDayTimeLineStyle = (props): string => {
  const getTopForTime = (name): number => {
    const dayTime = props.dayTimes.find((t) => t.key === name);
    return dayTime ? getTimeTop(dayTime.time) : 0;
  };
  return `
  font-size: 1.6rem;
  text-align: right;
  position: relative;
  background-image: linear-gradient(
    to bottom,
    rgb(3, 3, 3) 0%,
    rgb(3, 3, 3) ${getTopForTime('alotHashahar90')}px,
    rgba(30, 152, 209, 1) ${getTopForTime('sunrise')}px,
    rgb(202, 229, 243) ${getTopForTime('sofZmanTfila')}px,
    rgb(202, 229, 243) ${getTopForTime('hazot') - 50}px,
    rgb(240, 231, 26) ${getTopForTime('hazot')}px,
    rgb(202, 229, 243) ${getTopForTime('minhaGdola')}px,
    rgb(202, 229, 243) ${getTopForTime('plagMinha')}px,
    rgb(245, 86, 12) ${getTopForTime('sunset')}px,
    rgb(52, 17, 1) ${getTopForTime('tzetHakohavim')}px,
    rgb(3, 3, 3) ${getTopForTime('tzetHakohavimRT')}px,
    rgb(3, 3, 3) 100%
  );

  .daily-times-time {
    border: 1px solid rgba(160, 160, 160, 0.3);
    height: 200px;
    text-align: left;
    padding: 1rem;
  }
  .daily-times-now {
    border-top: 3px solid ${getColor('tertiary', props)};
    position: absolute;
    left: 0;
    right: 0;
    text-align: left;
    padding: 0 4rem;
    top: ${getTimeTop(getNowTime())}px;
    font-size: 2.6rem;
    color: ${getColor('tertiary', props)};
    line-height: 1;
  }
  .daily-times-time-item {
    position: absolute;
    right: 1rem;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    box-shadow: 0 2px 4px white;
    border: none;
  }
  `;
};

const StyledDayTimeLine = styled.div`
  ${(props): string => getStyledDayTimeLineStyle(props)}
`;

const StyledDayTimesItem = styled(DayTimeItem)`
  position: absolute;
  right: 1rem;
  top: ${(props): number => getTimeTop(props.hour)}px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  box-shadow: 0 2px 4px white;
  border: none;
  font-size: 2.6rem;
`;

const DailyTimeLine: React.FC<DailyTimeLineProps> = ({ dayTimes }) => {
  return (
    <StyledDayTimeLine {...{ dayTimes }}>
      {times.map((time) => (
        <div key={time} className="daily-times-time">
          {time}
        </div>
      ))}
      <div className="daily-times-now">
        <div>עכשיו</div>
        <div>{getNowTime()}</div>
      </div>
      {dayTimes.map((dayTime) => {
        const inDay = dayTime.inDay;
        return (
          <StyledDayTimesItem
            inDayTime={inDay}
            inNightTime={!inDay}
            key={dayTime.key}
            // style={{ top: top + 'px' }}
            hour={dayTime.time}
            name={dayTime.title}
          />
        );
      })}
    </StyledDayTimeLine>
  );
};
export default DailyTimeLine;
