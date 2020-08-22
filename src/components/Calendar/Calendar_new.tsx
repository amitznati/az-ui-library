import React from 'react';
import Slider from 'react-slick';
import Hebcal from 'hebcal';

import './_react-slick.css';
import { CalendarProps, HeDay, HeEvent, Month } from './Calendar.types';

const renderMonth = (month: Month): JSX.Element => {
  let calendarDayIndex = -month.days[0].getDay();
  const prevMonth = month.prev();
  const nextMonth = month.next();
  const days: Array<HeDay> = [];
  for (let i = calendarDayIndex; i < 0; i += 1) {
    days.push(prevMonth.days[prevMonth.length + i]);
  }
  days.push(...month.days);
  for (
    let i = 0;
    i < 42 - (month.length + Math.abs(calendarDayIndex));
    i += 1
  ) {
    days.push(nextMonth.days[i]);
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
                <div>
                  {day.greg().getMonth() + 1}/{day.greg().getFullYear()}
                </div>
                <div>{day.greg().getDate()}</div>
                <div>{Hebcal.gematriya(day.day)}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

class Calendar extends React.Component<
  CalendarProps,
  { activeMonth: number; months: Array<Month>; holidays: Array<HeEvent> }
> {
  constructor(props) {
    super(props);
    const year = new Hebcal.GregYear();
    // let months: Array<Month> = [];
    // for (let i = 0; i < 20; i += 1) {
    //   console.log(year.year);
    //   months = [...months, ...year.months];
    //   year = year.next();
    // }
    this.state = {
      activeMonth: new Date().getMonth(),
      months: year.months,
      holidays: year.holidays
    };
    // this.moveMonthDown = this.moveMonthDown.bind(this);
    // this.moveMonthUp = this.moveMonthUp.bind(this);
    // this.setActiveMonth = this.setActiveMonth.bind(this);
    this.onAfterChange = this.onAfterChange.bind(this);
  }

  private slickRef = React.createRef<any>();
  componentDidMount() {
    if (this.slickRef.current) {
      this.slickRef.current.slickGoTo(new Date().getMonth());
    }
  }

  // setActiveMonth(activeMonth) {
  //   this.setState({ activeMonth });
  // }

  // moveMonthUp(): void {
  //   const { activeMonth, months, holidays } = this.state;
  //   // this.setActiveMonth(activeMonth + 1);
  //   if (activeMonth + 3 > months.length) {
  //     const newYear = new Hebcal.GregYear(months[activeMonth].year + 1);
  //     this.setState({
  //       months: [...months, ...newYear.months],
  //       holidays: {
  //         ...holidays,
  //         ...newYear.holidays
  //       }
  //     });
  //   }
  // }
  //
  // moveMonthDown(): void {
  //   const { activeMonth, months, holidays } = this.state;
  //   this.setActiveMonth(activeMonth - 1);
  //   if (activeMonth <= 2) {
  //     const newYear = new Hebcal.GregYear(months[activeMonth].year - 1);
  //     this.setState({
  //       months: [...newYear.months, ...months],
  //       holidays: {
  //         ...newYear.holidays,
  //         ...holidays
  //       }
  //     });
  //     this.setActiveMonth(activeMonth + 11);
  //   }
  // }

  onAfterChange(index) {
    const { months, holidays } = this.state;
    if (index + 3 > months.length) {
      const newYear = new Hebcal.GregYear(months[index].year + 1);
      this.setState({
        months: [...months, ...newYear.months],
        holidays: {
          ...holidays,
          ...newYear.holidays
        }
      });
    } else if (index < 4) {
      const newYear = new Hebcal.GregYear(months[index].year - 1);
      this.setState({
        months: [...newYear.months, ...months],
        holidays: {
          ...newYear.holidays,
          ...holidays
        }
      });
      if (this.slickRef.current) {
        this.slickRef.current.slickGoTo(index + 12);
      }
    }
  }
  // moveYearUp(): void {
  //   const year = new Hebcal.GregYear(months[activeMonth].year + 1);
  //   setMonths(year.months);
  //   setHolidays(year.holidays);
  //   setActiveMonth(activeMonth % 12);
  // }
  // moveYearDown(): void {
  //   const year = new Hebcal.GregYear(months[activeMonth].year - 1);
  //   setMonths(year.months);
  //   setHolidays(year.holidays);
  //   setActiveMonth(activeMonth % 12);
  // }

  render() {
    const { months } = this.state;
    return (
      <div style={{ maxWidth: '40rem' }}>
        <h2>Variable width</h2>
        <Slider
          ref={this.slickRef}
          {...{
            className: 'center',
            centerMode: true,
            infinite: false,
            slidesToShow: 1,
            speed: 500,
            accessibility: false,
            // initialSlide: activeMonth,
            arrows: false,
            // rtl: true,
            afterChange: (index): void => this.onAfterChange(index)
          }}
        >
          {months.map((month) => (
            <div key={`${month.month}-${month.year}`}>{renderMonth(month)}</div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default Calendar;
