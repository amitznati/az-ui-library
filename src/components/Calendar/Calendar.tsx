import React from 'react';
import Hebcal from 'hebcal';
import { Month, HeDay, HeEvent, CalendarProps } from './Calendar.types';
import { monthsArrayHe, heDaysLong, monthsArrayTranslate } from './constants';
import CardsSwift from '../CardsSwift/CardsSwift';
import IconButton from '../IconButton/IconButton';

import { ReactComponent as ArrowIcon } from '../../styles/assets/icons/arrow_forward_ios-24px.svg';
import { ReactComponent as FastArrowIcon } from '../../styles/assets/icons/arrow_fast_forward_ios-24px.svg';
import { ReactComponent as TargetIcon } from '../../styles/assets/icons/dot-circle-regular.svg';
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
    heNow: HeDay;
    nowMonthIndex: number;
    heSelectedDate: HeDay;
  }
> {
  constructor(props) {
    super(props);
    const year = new Hebcal.GregYear();
    const now = new Date();
    const heNow = new Hebcal.HDate();
    const heSelectedDate = new Hebcal.HDate(props.selectedDate);
    this.state = {
      calendarOpen: false,
      activeMonth: now.getMonth(),
      months: year.months,
      holidays: year.holidays,
      heNow,
      heSelectedDate,
      nowMonthIndex: now.getMonth()
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
    this.setDateToNow = this.setDateToNow.bind(this);
  }

  componentDidUpdate(prevProps: Readonly<CalendarProps>): void {
    const { selectedDate } = this.props;
    if (
      selectedDate.getMonth() !== prevProps.selectedDate.getMonth() ||
      selectedDate.getFullYear() !== prevProps.selectedDate.getFullYear() ||
      selectedDate.getDate() !== prevProps.selectedDate.getDate()
    ) {
      const heSelectedDate = new Hebcal.HDate(selectedDate);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        heSelectedDate
      });
    }
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
    const { activeMonth, months, holidays, nowMonthIndex } = this.state;
    this.setState({ activeMonth: activeMonth - 1 });
    if (activeMonth <= 2) {
      const id = setTimeout(() => {
        const newYear = new Hebcal.GregYear(months[activeMonth].year - 1);
        this.setState({
          months: [...newYear.months, ...months],
          holidays: { ...newYear.holidays, ...holidays },
          activeMonth: activeMonth + 11,
          nowMonthIndex: nowMonthIndex + 12
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

  renderDay(day: HeDay, isDisable, isNow, isSelected): JSX.Element {
    const { autoCloseOnSelect, onSelectDate } = this.props;
    const key = [day.day, day.month, day.year].join('-');
    const { holidays } = this.state;
    return (
      <StyledCalendarDay
        key={key}
        isDisable={isDisable}
        isNow={isNow}
        isSelected={isSelected}
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

  renderCalendarMonth(month: Month, index, activeIndex): JSX.Element {
    const days: Array<JSX.Element> = [];
    let calendarDayIndex = 0;
    if (Math.abs(index - activeIndex) > 2) {
      for (let i = 0; i < 42; i += 1) {
        days.push(<StyledCalendarDay day={month.days[0]} />);
      }
    } else {
      const { heNow, heSelectedDate } = this.state;
      const isSameDate = (d1, d2): boolean =>
        d1.month === d2.month && d1.year === d2.year && d1.day === d2.day;
      const isNow = (day): boolean => isSameDate(day, heNow);
      const isSelected = (day): boolean => isSameDate(day, heSelectedDate);
      calendarDayIndex = -month.days[0].getDay();
      const prevMonth = this.state.months[this.state.activeMonth - 1];
      const nextMonth = this.state.months[this.state.activeMonth + 1];

      for (let i = calendarDayIndex; i < 0; i += 1) {
        const day = prevMonth.days[prevMonth.length + i];
        days.push(this.renderDay(day, true, isNow(day), isSelected(day)));
      }
      month.days.forEach((day) =>
        days.push(this.renderDay(day, false, isNow(day), isSelected(day)))
      );
      for (
        let i = 0;
        i < 42 - (month.length + Math.abs(calendarDayIndex));
        i += 1
      ) {
        const day = nextMonth.days[i];
        days.push(this.renderDay(day, true, isNow(day), isSelected(day)));
        // days.push(null);
      }
      calendarDayIndex = 0;
    }
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

  setDateToNow(): void {
    const { nowMonthIndex, heNow } = this.state;
    this.setState({
      activeMonth: nowMonthIndex
    });
    this.props.onSelectDate(heNow.greg());
  }

  render(): JSX.Element {
    const { calendarOpen, activeMonth, months } = this.state;
    return (
      <StyledCalendarContainer>
        <StyledCalendarSelectedDate>
          <IconButton
            size={30}
            iconSrc={TargetIcon}
            onClick={this.setDateToNow}
          />
          <span>{this.getSelectedDateText()}</span>
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
              speed={0.3}
            />
          </StyledCalendarMonthContainer>
        </StyledCalendarMain>
      </StyledCalendarContainer>
    );
  }
}

export default Calendar;
