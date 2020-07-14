interface Day {
  isSelected?: boolean;
  isDisable: boolean;
  eventText?: string;
  heDate: string;
  date: {
    day: number;
    month: number;
    year: number;
  };
  key: string;
}
export interface CalenderProps {
  calenderWeeks: Array<Array<Day>>;
}
