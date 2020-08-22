export interface Month {
  year: number;
  month: number;
  days: Array<HeDay>;
  length: number;
  hebmonths: Array<HeMonth>;
  il: boolean;
  lat: number;
  long: number;
  prev: () => Month;
  next: () => Month;
}

export interface HeDay {
  month: number;
  day: number;
  year: number;
  lat: number;
  long: number;
  il: boolean;
  getSedra: (h: string) => Array<string>;
  next: () => HeDay;
  greg: () => Date;
  holidays: (isAll: boolean) => Array<HeEvent>;
  getDay: () => number;
  eventText?: string;
}
export interface HeEvent {
  date: HeDay;
  desc: Array<string>;
  USER_EVENT: boolean;
  LIGHT_CANDLES: boolean;
  YOM_TOV_ENDS: boolean;
  CHUL_ONLY: boolean;
  IL_ONLY: boolean;
  LIGHT_CANDLES_TZEIS: false;
}

interface HeMonth {
  month: number;
  year: number;
}

// interface Year {
//   year: number;
//   months: Array<Month>;
//   hebyears: Array<number>;
//   holidays: {};
//   length: number;
//   il: boolean;
//   lat: number;
//   long: number;
// }

export interface CalendarDayProps {
  day?: HeDay;
  onSelect?: (d: HeDay) => void;
}

export interface CalendarMonthProps {
  month: Month;
}

export interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (Date) => void;
  autoCloseOnSelect?: boolean;
}
