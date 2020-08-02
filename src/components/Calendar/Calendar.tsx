import React from 'react';
import Hebcal from 'hebcal';
import { Month, HeDay, HeEvent, CalendarProps } from './Calendar.types';
import { monthsArrayHe, heDaysLong, monthsArrayTranslate } from './constants';
import CardsSwift from '../CardsSwift/CardsSwift';
import IconButton from '../IconButton/IconButton';

import { ReactComponent as ArrowIcon } from '../../styles/assets/icons/arrow_forward_ios-24px.svg';
import {
  StyledCalendarExpandIcon,
  StyledCalendarContainer,
  StyledCalendarSelectedDate,
  StyledCalendarMain,
  StyledCalendarHeader,
  StyledCalendarWeekDays,
  StyledCalendarWeek,
  StyledCalendarMonth,
  StyledCalendarMonthContainer,
  StyledCalendarMonthPlaceholder, StyledCalendarDay, StyledCalendarDayName
} from './Calendar.styles'

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

const renderCalendarPlaceHolder = (): JSX.Element => {
  return (
    <StyledCalendarMonthPlaceholder>&nbsp;</StyledCalendarMonthPlaceholder>
  );
};

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onSelectDate,
  autoCloseOnSelect
}) => {
  const year = new Hebcal.GregYear();
  const [activeMonth, setActiveMonth] = React.useState(new Date().getMonth());
  const [calendarOpen, setCalendarOpen] = React.useState(false);
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
  const toggleCalendar = (): void => setCalendarOpen(!calendarOpen);
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
  const moveMonthDown = (): void => {
    setActiveMonth(activeMonth - 1);
    if (activeMonth <= 2) {
      const id = setTimeout(() => {
        const newYear = new Hebcal.GregYear(months[activeMonth].year - 1);
        setMonths([...newYear.months, ...months]);
        setHolidays({
          ...newYear.holidays,
          ...holidays
        });
        setActiveMonth(activeMonth + 11);
        clearTimeout(id);
      }, 600);
    }
  };
  const moveYearUp = (): void => {
    const year = new Hebcal.GregYear(months[activeMonth].year + 1);
    setMonths(year.months);
    setHolidays(year.holidays);
    setActiveMonth(activeMonth % 12);
  };
  const moveYearDown = (): void => {
    const year = new Hebcal.GregYear(months[activeMonth].year - 1);
    setMonths(year.months);
    setHolidays(year.holidays);
    setActiveMonth(activeMonth % 12);
  };
  const renderCalendarMonth = (month: Month): JSX.Element => {
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
      <StyledCalendarMonth>
        {[0, 1, 2, 3, 4, 5].map((week) => (
          <StyledCalendarWeek key={`week-${week}`}>
            {[0, 1, 2, 3, 4, 5, 6].map((d) => {
              const day = days[calendarDayIndex];
              calendarDayIndex += 1;
              const key = ['day', month.month, week, d].join('-');
              const isDisable = day.greg().getMonth() !== month.month - 1;
              return (
                <StyledCalendarDay
                  key={key}
                  isDisable={isDisable}
                  onClick={(): void => {
                    onSelectDate(day.greg());
                    autoCloseOnSelect && toggleCalendar();
                  }}
                >
                  <div className="day-dates">
                    <span>{day.greg().getDate()}</span>
                    <span>{Hebcal.gematriya(day.day)}</span>
                  </div>
                  <span>{getEventText(holidays[day.toString()], day)}</span>
                </StyledCalendarDay>
              );
            })}
          </StyledCalendarWeek>
        ))}
      </StyledCalendarMonth>
    );
  };
  const getHeMonthName = (): string => {
    const hebmonths = months[activeMonth].hebmonths.map(
      (heMonth) => monthsArrayHe[heMonth.month - 1]
    );
    return hebmonths.join(hebmonths.length > 1 ? '-' : '');
  };
  const getHeYearName = (): string => {
    const heyears = months[activeMonth].hebmonths.map((heMonth) =>
      Hebcal.gematriya(heMonth.year)
    );
    if (heyears.length > 1 && heyears[0] !== heyears[1]) {
      return heyears.join('-');
    }
    return heyears[0];
  };
  const getSelectedDateText = (): string => {
    const heDate = new Hebcal.HDate(selectedDate);
    const str = [
      Hebcal.gematriya(heDate.day),
      monthsArrayHe[heDate.month - 1],
      Hebcal.gematriya(heDate.year % 5000),
      ' - ',
      selectedDate.getDate(),
      monthsArrayTranslate[selectedDate.getMonth()],
      selectedDate.getFullYear()
    ];
    return str.join(' ');
  };
  return (
    <StyledCalendarContainer>
      {/* <h1>{time.toISOString()}</h1> */}
      <StyledCalendarSelectedDate>
        <span className="u-abs-center">{getSelectedDateText()}</span>
        <StyledCalendarExpandIcon isOpen={calendarOpen}>
          <IconButton
            size={30}
            className="calendar-expand-icon__icon"
            iconSrc={ArrowIcon}
            onClick={toggleCalendar}
          />
        </StyledCalendarExpandIcon>
      </StyledCalendarSelectedDate>
      <StyledCalendarMain isOpen={calendarOpen}>
        <StyledCalendarHeader>
          <div>
            <div>
              <span className="calendar-header-month">
                <IconButton
                  onClick={moveYearUp}
                  iconSrc={ArrowIcon}
                  size={30}
                  className="arrow-up"
                />
                <span>{months[activeMonth].year}</span>
                <IconButton
                  onClick={moveYearDown}
                  iconSrc={ArrowIcon}
                  size={30}
                  className="arrow-down"
                />
              </span>
            </div>
            <div>
              <span className="calendar-header-month">
                <IconButton
                  onClick={moveMonthUp}
                  iconSrc={ArrowIcon}
                  size={30}
                  className="arrow-up"
                />
                <span className="calendar-header-text">
                  {monthsArrayTranslate[months[activeMonth].month - 1]}
                </span>
                <IconButton
                  onClick={moveMonthDown}
                  iconSrc={ArrowIcon}
                  size={30}
                  className="arrow-down"
                />
              </span>
            </div>
          </div>
          <div>
            <span className="calendar-header-month-he">{getHeMonthName()}</span>
            <span className="calendar-header-year">{getHeYearName()}</span>
          </div>
        </StyledCalendarHeader>
        <StyledCalendarWeekDays>
          {heDaysLong.map((day) => (
            <StyledCalendarDayName key={day}>{day}</StyledCalendarDayName>
          ))}
        </StyledCalendarWeekDays>
        <StyledCalendarMonthContainer>
          <CardsSwift
            data={months}
            activeIndex={activeMonth}
            renderItem={renderCalendarMonth}
            renderPlaceHolderItem={renderCalendarPlaceHolder}
            onSwiftLeft={moveMonthUp}
            onSwiftRight={moveMonthDown}
            // height={isPhone ? '50rem' : '52rem'}
            itemToShow={3}
          />
        </StyledCalendarMonthContainer>
      </StyledCalendarMain>
    </StyledCalendarContainer>
  );
};

export default Calendar;
