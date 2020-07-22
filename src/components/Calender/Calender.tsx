import React from 'react';
import Hebcal from 'hebcal';
import { Month, CalenderDayProps, HeDay, HeEvent } from './Calender.types';
import { monthsArrayHe, heDaysLong } from './constants';
import CardsSwift from '../CardsSwift/CardsSwift';
import './Calender.scss';

window.Hebcal = Hebcal;
const getEventText = (heDate: HeDay): string | undefined => {
  const events = heDate.holidays(true);
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
const CalenderDay: React.FC<CalenderDayProps> = ({ day, onSelect }) => {
  const className = [
    'day'
    // day.isDisable ? 'day--disabled' : '',
    // day.isSelected ? 'day--selected' : '',
    // day.isToday ? 'day--today' : ''
  ];
  return (
    <div
      onClick={onSelect && day ? (): void => onSelect(day) : undefined}
      className={className.join(' ')}
    >
      <span>{day ? day.greg().getDate() : ''}</span>
      <span>{day ? Hebcal.gematriya(day.day) : ''}</span>
      {/*<span>{day ? getEventText(day) : ''}</span>*/}
    </div>
  );
};
// const CalenderWeek: React.FC<CalenderProps> = ({ week, onSelectDate }) => {
//   return (
//     <div className="calendar-week">
//       {week.map((day) => (
//         <CalenderDay key={day.date.day} {...{ day, onSelectDate }} />
//       ))}
//     </div>
//   );
// };

const renderCalenderMonth = (month: Month): JSX.Element => {
  let calendarDayIndex = 1 - month.days[0].getDay();
  return (
    <div className="calendar-month">
      {[0, 1, 2, 3, 4, 5].map((week) => (
        <div key={`week-${week}`} className="calendar-week">
          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
            const d = month.days[calendarDayIndex];
            calendarDayIndex += 1;
            const key = ['day', month.month, week, day].join('-');
            return d ? (
              <CalenderDay key={key} day={d} />
            ) : (
              <div className="day" key={key} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

const renderCalenderPlaceHolder = (): JSX.Element => {
  return (
    <div className="calendar-month">
      {[0, 1, 2, 3, 4].map((week) => (
        <div key={`week-${week}`} className="calendar-week">
          {[0, 1, 2, 3, 4, 5, 6].map((day) => (
            <div className="day" key={`day-${day}`}>
              &nbsp;
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Calender: React.FC<{}> = () => {
  const [activeMonth, setActiveMonth] = React.useState(new Date().getMonth());
  const [months, setMonths] = React.useState(new Hebcal.GregYear().months);
  const moveMonthUp = (): void => {
    setActiveMonth(activeMonth + 1);
    if (activeMonth + 5 > months.length) {
      setMonths([
        ...months,
        ...new Hebcal.GregYear(months[activeMonth].year + 1).months
      ]);
    }
  };
  const moveMontDown = (): void => {
    setActiveMonth(activeMonth - 1);
    if (activeMonth <= 0) {
      setMonths([
        ...new Hebcal.GregYear(months[activeMonth].year - 1).months,
        ...months
      ]);
      setActiveMonth(activeMonth + 11);
    }
  };
  return (
    <div className="calendar-container">
      {/* <div className="calender-sidebar"> */}
      {/*  {monthsArrayHe.map((month, index) => ( */}
      {/*    <div */}
      {/*      onClick={() => setActiveMonth(index)} */}
      {/*      className="calender-sidebar-month" */}
      {/*      key={month} */}
      {/*    > */}
      {/*      {month} */}
      {/*    </div> */}
      {/*  ))} */}
      {/* </div> */}
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
          // renderPlaceHolderItem={renderCalenderPlaceHolder}
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
