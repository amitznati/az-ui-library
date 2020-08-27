export interface SelectedDayInfoProps {
  selectedDateFormatted: {
    event: string;
    formattedDateHe: string;
    formattedDate: string;
  };
  nextEvents?: Array<NextEventItem>;
}
export interface NextEventItem {
  title: string;
  out: string;
  enter: string;
  date: {
    formattedDate: string;
    formattedDateHe: string;
  };
}
export interface NextEventProps {
  events: Array<NextEventItem>;
}
