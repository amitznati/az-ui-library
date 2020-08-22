import React from 'react';
import Hebcal from 'hebcal';
import { Month, HeDay, HeEvent, CalendarProps } from './Calendar.types';
import { monthsArrayHe, heDaysLong, monthsArrayTranslate } from './constants';
import CardsSwift from '../CardsSwift/CardsSwift';
import IconButton from '../IconButton/IconButton';

import { ReactComponent as ArrowIcon } from '../../styles/assets/icons/arrow_forward_ios-24px.svg';
import { ReactComponent as FastArrowIcon } from '../../styles/assets/icons/arrow_fast_forward_ios-24px.svg';
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
  StyledCalendarMonthPlaceholder,
  StyledCalendarDay,
  StyledCalendarDayName
} from './Calendar.styles';

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
  if (text) {
    text = text.replace('חוה"מ', '').replace('(', '').replace(')', '');
  }
  return text;
};

const renderCalendarPlaceHolder = (): JSX.Element => {
  return (
    <StyledCalendarMonthPlaceholder>&nbsp;</StyledCalendarMonthPlaceholder>
  );
};

class Calendar extends React.Component<
  CalendarProps,
  {
    calendarOpen: boolean;
    activeMonth: number;
    months: Array<Month>;
    holidays: Array<HeEvent>;
  }
> {
  constructor(props) {
    super(props);
    const year = new Hebcal.GregYear();
    this.state = {
      calendarOpen: false,
      activeMonth: new Date().getMonth(),
      months: year.months,
      holidays: year.holidays
    };
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.moveMonthUp = this.moveMonthUp.bind(this);
    this.moveMonthDown = this.moveMonthDown.bind(this);
    this.moveYearUp = this.moveYearUp.bind(this);
    this.moveYearDown = this.moveYearDown.bind(this);
    this.moveYear = this.moveYear.bind(this);
    this.getSelectedDateText = this.getSelectedDateText.bind(this);
    this.getHeYearName = this.getHeYearName.bind(this);
    this.getHeMonthName = this.getHeMonthName.bind(this);
    this.renderCalendarMonth = this.renderCalendarMonth.bind(this);
    this.renderDay = this.renderDay.bind(this);
  }

  toggleCalendar(): void {
    this.setState((s) => ({
      calendarOpen: !s.calendarOpen
    }));
  }

  moveMonthUp(): void {
    const { activeMonth, months, holidays } = this.state;
    this.setState({ activeMonth: activeMonth + 1 });
    if (activeMonth + 5 > months.length) {
      const newYear = new Hebcal.GregYear(months[activeMonth].year + 1);
      this.setState({
        months: [...months, ...newYear.months],
        holidays: {
          ...holidays,
          ...newYear.holidays
        }
      });
    }
  }

  moveMonthDown(): void {
    const { activeMonth, months, holidays } = this.state;
    this.setState({ activeMonth: activeMonth - 1 });
    if (activeMonth <= 2) {
      const id = setTimeout(() => {
        const newYear = new Hebcal.GregYear(months[activeMonth].year - 1);
        this.setState({
          months: [...newYear.months, ...months],
          holidays: { ...newYear.holidays, ...holidays },
          activeMonth: activeMonth + 11
        });
        clearTimeout(id);
      }, 600);
    }
  }

  moveYear(toAdd): void {
    const { activeMonth, months } = this.state;
    const year = new Hebcal.GregYear(months[activeMonth].year + toAdd);
    this.setState({
      months: year.months,
      holidays: year.holidays,
      activeMonth: activeMonth % 12
    });
  }

  moveYearUp(): void {
    this.moveYear(1);
  }

  moveYearDown(): void {
    this.moveYear(-1);
  }

  renderDay(day: HeDay, isDisable): JSX.Element {
    const { autoCloseOnSelect, onSelectDate } = this.props;
    const key = [day.day, day.month, day.year].join('-');
    const { holidays } = this.state;
    return (
      <StyledCalendarDay
        key={key}
        isDisable={isDisable}
        onClick={(): void => {
          onSelectDate(day.greg());
          autoCloseOnSelect && this.toggleCalendar();
        }}
      >
        <div className="day-dates">
          <span>{day.greg().getDate()}</span>
          <span>{Hebcal.gematriya(day.day)}</span>
        </div>
        <span>{getEventText(holidays[day.toString()], day)}</span>
      </StyledCalendarDay>
    );
  }

  renderCalendarMonth(month: Month): JSX.Element {
    let calendarDayIndex = -month.days[0].getDay();
    const prevMonth = this.state.months[this.state.activeMonth - 1];
    const nextMonth = this.state.months[this.state.activeMonth + 1];
    const days: Array<JSX.Element | null> = [];
    for (let i = calendarDayIndex; i < 0; i += 1) {
      days.push(
        prevMonth
          ? this.renderDay(prevMonth.days[prevMonth.length + i], true)
          : null
      );
      // days.push(null);
    }
    month.days.forEach((day) => days.push(this.renderDay(day, false)));
    for (
      let i = 0;
      i < 42 - (month.length + Math.abs(calendarDayIndex));
      i += 1
    ) {
      days.push(nextMonth ? this.renderDay(nextMonth.days[i], true) : null);
      // days.push(null);
    }
    calendarDayIndex = 0;
    return (
      <StyledCalendarMonth>
        {[0, 1, 2, 3, 4, 5].map((week) => (
          <StyledCalendarWeek key={`week-${week}`}>
            {[0, 1, 2, 3, 4, 5, 6].map(() => {
              const day = days[calendarDayIndex];
              calendarDayIndex += 1;
              return day;
            })}
          </StyledCalendarWeek>
        ))}
      </StyledCalendarMonth>
    );
  }

  getHeMonthName(): string {
    const { activeMonth, months } = this.state;
    const hebmonths = months[activeMonth].hebmonths.map(
      (heMonth) => monthsArrayHe[heMonth.month - 1]
    );
    return hebmonths.join(hebmonths.length > 1 ? '-' : '');
  }

  getHeYearName(): string {
    const { activeMonth, months } = this.state;
    const heyears = months[activeMonth].hebmonths.map((heMonth) =>
      Hebcal.gematriya(heMonth.year)
    );
    if (heyears.length > 1 && heyears[0] !== heyears[1]) {
      return heyears.join('-');
    }
    return heyears[0];
  }

  getSelectedDateText(): string {
    const { selectedDate } = this.props;
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
  }

  render(): JSX.Element {
    const { calendarOpen, activeMonth, months } = this.state;
    return (
      <StyledCalendarContainer>
        {/* <h1>{time.toISOString()}</h1> */}
        <StyledCalendarSelectedDate>
          <span className="u-abs-center">
            {this.getSelectedDateText()}
          </span>
          <StyledCalendarExpandIcon isOpen={calendarOpen}>
            <IconButton
              size={30}
              className="calendar-expand-icon__icon"
              iconSrc={ArrowIcon}
              onClick={this.toggleCalendar}
            />
          </StyledCalendarExpandIcon>
        </StyledCalendarSelectedDate>
        <StyledCalendarMain isOpen={calendarOpen}>
          <StyledCalendarHeader>
            <div>
              <span className="calendar-header-month">
                <IconButton
                  onClick={this.moveYearUp}
                  iconSrc={FastArrowIcon}
                  size={30}
                  className="arrow-up"
                />
                <IconButton
                  onClick={this.moveMonthUp}
                  iconSrc={ArrowIcon}
                  size={30}
                  className="arrow-up"
                />
                <span>{months[activeMonth].year}</span>
                <span className="calendar-header-text">
                  {monthsArrayTranslate[months[activeMonth].month - 1]}
                </span>
                <IconButton
                  onClick={this.moveMonthDown}
                  iconSrc={ArrowIcon}
                  size={30}
                  className="arrow-down"
                />
                <IconButton
                  onClick={this.moveYearDown}
                  iconSrc={FastArrowIcon}
                  size={30}
                  className="arrow-down"
                />
              </span>
            </div>
            <div>
              <span className="calendar-header-month-he">
                {this.getHeMonthName()}
              </span>
              <span className="calendar-header-year">
                {this.getHeYearName()}
              </span>
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
              renderItem={this.renderCalendarMonth}
              renderPlaceHolderItem={renderCalendarPlaceHolder}
              onSwiftLeft={this.moveMonthUp}
              onSwiftRight={this.moveMonthDown}
              // height={isPhone ? '50rem' : '52rem'}
              itemToShow={2}
              // speed={0.3}
            />
          </StyledCalendarMonthContainer>
        </StyledCalendarMain>
      </StyledCalendarContainer>
    );
  }
}

export default Calendar;
