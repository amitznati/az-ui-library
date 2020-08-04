import React from 'react';
// import styled from 'styled-components';

// import { DailyTimeLineProps } from './DailyTimeLine.types';
import DayTimeItem from '../DayTimeItem/DayTimeItem';
import './DailyTimeLine.scss';
const times: Array<string> = [];
for (let i = 0; i < 10; i += 1) times.push(`0${i}:00`);
for (let i = 10; i < 24; i += 1) times.push(`${i}:00`);
const getTimeTop = (time): number => {
  const [h, m] = time.split(':');
  return Number((h * 200 + (m / 60) * 200).toFixed(2));
};

// const StyledDayTimeLine = styled.div`
//   font-size: 1.6rem;
//   text-align: right;
//   position: relative;
//   background-image: linear-gradient(
//     to bottom,
//     rgb(3, 3, 3) 0%,
//     rgba(3, 3, 3, 0.9)
//       ${(props): string => getTimePercentage(props.dayTimes, 'alotHashahar90')}%,
//     rgba(30, 152, 209, 1)
//       ${(props): string => getTimePercentage(props.dayTimes, 'sunrise')}%,
//     rgb(202, 229, 243)
//       ${(props): string => getTimePercentage(props.dayTimes, 'sunrise', 2)}%,
//     rgb(202, 229, 243)
//       ${(props): string => getTimePercentage(props.dayTimes, 'sofZmanTfila')}%,
//     rgb(240, 231, 26)
//       ${(props): string => getTimePercentage(props.dayTimes, 'hazot')}%,
//     rgb(202, 229, 243)
//       ${(props): string => getTimePercentage(props.dayTimes, 'minhaGdola')}%,
//     rgb(245, 86, 12)
//       ${(props): string => getTimePercentage(props.dayTimes, 'plagMinha')}%,
//     rgba(197, 127, 81, 0.82)
//       ${(props): string => getTimePercentage(props.dayTimes, 'sunset')}%,
//     rgba(5, 5, 5, 1)
//       ${(props): string => getTimePercentage(props.dayTimes, 'tzetHakohavim')}%,
//     rgb(54, 55, 56)
//       ${(props): string =>
//         getTimePercentage(props.dayTimes, 'tzetHakohavimRT')}%,
//     rgb(3, 3, 3) 100%
//   );
// `;
const DailyTimeLine: React.FC<{
  dayTimes: Array<{ key: string; title: string; time: string }>;
}> = ({ dayTimes }) => {
  const arr = dayTimes.map(
    (dayTime) => `$${dayTime.key}: ${getTimeTop(dayTime.time)};`
  );
  console.log(...arr);
  return (
    <div className="daily-times">
      {times.map((time) => (
        <div key={time} className="daily-times-time">
          {time}
        </div>
      ))}
      {dayTimes.map((dayTime) => {
        const top = getTimeTop(dayTime.time);
        const inDay = top > 1100 && top < 3700;
        return (
          <DayTimeItem
            inDayTime={inDay}
            inNightTime={!inDay}
            className="daily-times-time-item"
            key={dayTime.key}
            style={{ top: top + 'px' }}
            hour={dayTime.time}
            name={dayTime.title}
          />
        );
      })}
      {/* <DayTimeItem */}
      {/*  className="daily-times-time-item now" */}
      {/*  style={{ */}
      {/*    top: getTimeTop('04:30') */}
      {/*  }} */}
      {/*  hour="04:30" */}
      {/*  name="עכשיו" */}
      {/* /> */}
    </div>
  );
};
export default DailyTimeLine;
