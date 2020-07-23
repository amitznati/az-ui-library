import React from 'react';
import Hebcal from 'hebcal';
import { Month, HeDay, HeEvent } from './Calender.types';
import { monthsArrayHe, heDaysLong } from './constants';
import CardsSwift from '../CardsSwift/CardsSwift';
import './Calender.scss';

// window.Hebcal = Hebcal;

const getEventText = (
  events: Array<HeEvent>,
  heDate: HeDay
): string | undefined => {
  if (!events) return '';
  const newEvent = events.filter(
    (e: HeEvent) => (heDate.il && !e.CHUL_ONLY) || !heDate.il
  );
  const eventText = newEvent.find((ev: HeEvent) => ev.desc[2] !== 'ערב שבת');
  let text = eventText && eventText.desc[2];
  if (text === 'שבת') {
    text = heDate.getSedra('h').join(' ');
  }
  if (text && text.includes('ראש חודש')) {
    text = text.replace(
      'ראש חודש',
      `${monthsArrayHe[heDate.next().month - 1]} `
    );
  }
  return text;
};
// const CalenderDay: React.FC<CalenderDayProps> = ({ day, onSelect }) => {
//   const className = [
//     'day'
//     // day.isDisable ? 'day--disabled' : '',
//     // day.isSelected ? 'day--selected' : '',
//     // day.isToday ? 'day--today' : ''
//   ];
//   return (
//     <div
//       onClick={onSelect && day ? (): void => onSelect(day) : undefined}
//       className={className.join(' ')}
//     >
//       <span>{day ? day.greg().getDate() : ''}</span>
//       <span>{day ? Hebcal.gematriya(day.day) : ''}</span>
//       <span>{day ? getEventText(day) : ''}</span>
//     </div>
//   );
// };
// const CalenderWeek: React.FC<CalenderProps> = ({ week, onSelectDate }) => {
//   return (
//     <div className="calendar-week">
//       {week.map((day) => (
//         <CalenderDay key={day.date.day} {...{ day, onSelectDate }} />
//       ))}
//     </div>
//   );
// };

const renderCalenderPlaceHolder = (): JSX.Element => {
  return (
    <div className="calendar-month placeholder">
      {/* {[0, 1, 2, 3, 4].map((week) => ( */}
      {/*  <div key={`week-${week}`} className="calendar-week"> */}
      {/*    {[0, 1, 2, 3, 4, 5, 6].map((day) => ( */}
      {/*      <div className="day" key={`day-${day}`}> */}
      {/*        &nbsp; */}
      {/*      </div> */}
      {/*    ))} */}
      {/*  </div> */}
      {/* ))} */}
    </div>
  );
};

const Calender: React.FC<{}> = () => {
  const year = new Hebcal.GregYear();
  const [activeMonth, setActiveMonth] = React.useState(new Date().getMonth());
  const [months, setMonths] = React.useState(year.months);
  const [holidays, setHolidays] = React.useState(year.holidays);
  // TESTING
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const moveMonthUp = (): void => {
    setActiveMonth(activeMonth + 1);
    if (activeMonth + 5 > months.length) {
      const newYear = new Hebcal.GregYear(months[activeMonth].year + 1);
      setMonths([...months, ...newYear.months]);
      setHolidays({
        ...holidays,
        ...newYear.holidays
      });
    }
  };
  const moveMontDown = (): void => {
    setActiveMonth(activeMonth - 1);
    if (activeMonth <= 0) {
      const newYear = new Hebcal.GregYear(months[activeMonth].year - 1);
      setMonths([...newYear.months, ...months]);
      setHolidays({
        ...newYear.holidays,
        ...holidays
      });
      setActiveMonth(activeMonth + 11);
    }
  };
  const renderCalenderMonth = (month: Month): JSX.Element => {
    let calendarDayIndex = 0 - month.days[0].getDay();
    return (
      <div className="calendar-month">
        {[0, 1, 2, 3, 4, 5].map((week) => (
          <div key={`week-${week}`} className="calendar-week">
            {[0, 1, 2, 3, 4, 5, 6].map((d) => {
              const day = month.days[calendarDayIndex];
              calendarDayIndex += 1;
              const key = ['day', month.month, week, d].join('-');
              return day ? (
                <div key={key} className="day">
                  <span>{calendarDayIndex}</span>
                  <span>{Hebcal.gematriya(day.day)}</span>
                  <span>{getEventText(holidays[day.toString()], day)}</span>
                </div>
              ) : (
                <div className="day" key={key} />
              );
            })}
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="calendar-container">
      <h1>{time.toISOString()}</h1>
      <div className="calendar-main">
        <div className="calendar-header">
          <span className="calendar-header-month">
            {monthsArrayHe[activeMonth % 12]}
          </span>
          <p className="calendar-header-year">{months[activeMonth].year}</p>
        </div>
        <div className="calendar-week calendar-week-days">
          {heDaysLong.map((day) => (
            <span key={day} className="day-name">
              {day}
            </span>
          ))}
        </div>
        <CardsSwift
          data={months}
          activeIndex={activeMonth}
          renderItem={renderCalenderMonth}
          renderPlaceHolderItem={renderCalenderPlaceHolder}
          onSwiftLeft={moveMonthUp}
          onSwiftRight={moveMontDown}
          height="calc(6*13rem)"
        />
        <div className="cards-swift-stories-buttons">
          <span onClick={moveMonthUp}>+</span>
          <span onClick={moveMontDown}>-</span>
        </div>
      </div>
    </div>
  );
};

export default Calender;
