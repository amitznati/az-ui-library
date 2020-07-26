import React from 'react';
import Hebcal from 'hebcal';
import { Month, HeDay, HeEvent } from './Calender.types';
import { monthsArrayHe, heDaysLong, monthsArrayTranslate } from './constants';
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

const renderCalenderPlaceHolder = (): JSX.Element => {
  return <div className="calendar-month placeholder">&nbsp;</div>;
};

const Calender: React.FC<{}> = () => {
  const year = new Hebcal.GregYear();
  const [activeMonth, setActiveMonth] = React.useState(new Date().getMonth());
  const [months, setMonths] = React.useState(year.months);
  const [holidays, setHolidays] = React.useState(year.holidays);
  // TESTING
  // const [time, setTime] = React.useState(new Date());
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTime(new Date());
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  // END
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
    if (activeMonth <= 1) {
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
    let calendarDayIndex = -month.days[0].getDay();
    const days: Array<HeDay> = [];
    for (let i = calendarDayIndex; i < 0; i += 1) {
      days.push(
        months[activeMonth - 1].days[months[activeMonth - 1].length + i]
      );
    }
    days.push(...month.days);
    for (
      let i = 0;
      i < 42 - (month.length + Math.abs(calendarDayIndex));
      i += 1
    ) {
      days.push(months[activeMonth + 1].days[i]);
    }
    calendarDayIndex = 0;
    return (
      <div className="calendar-month">
        {[0, 1, 2, 3, 4, 5].map((week) => (
          <div key={`week-${week}`} className="calendar-week">
            {[0, 1, 2, 3, 4, 5, 6].map((d) => {
              const day = days[calendarDayIndex];
              calendarDayIndex += 1;
              const key = ['day', month.month, week, d].join('-');
              const classNames = [
                'day',
                day.greg().getMonth() !== month.month - 1 ? 'day--disabled' : ''
              ];
              return (
                <div key={key} className={classNames.join(' ')}>
                  <span>{day.greg().getDate()}</span>
                  <span>{Hebcal.gematriya(day.day)}</span>
                  <span>{getEventText(holidays[day.toString()], day)}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };
  const getHeMonthName = () => {
    const hebmonths = months[activeMonth].hebmonths.map(
      (heMonth) => monthsArrayHe[heMonth.month - 1]
    );
    return hebmonths.join(hebmonths.length > 1 ? '-' : '');
  };
  const getHeYearName = () => {
    const heyears = months[activeMonth].hebmonths.map((heMonth) =>
      Hebcal.gematriya(heMonth.year)
    );
    if (heyears.length > 1 && heyears[0] !== heyears[1]) {
      return heyears.join('-');
    }
    return heyears[0];
  };
  return (
    <div className="calendar-container">
      {/* <h1>{time.toISOString()}</h1> */}
      <div className="calendar-main">
        <div className="calendar-header">
          <div>
            <span className="calendar-header-month">
              {monthsArrayTranslate[months[activeMonth].month - 1]}
            </span>
            <span className="calendar-header-year">
              {months[activeMonth].year}
            </span>
          </div>
          <div>
            <span className="calendar-header-month">{getHeMonthName()}</span>
            <span className="calendar-header-year">{getHeYearName()}</span>
          </div>
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
          height="52rem"
          itemToShow={3}
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
