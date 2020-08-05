export interface DailyTimeLineProps {
  dayTimes: Array<{
    key: string;
    title: string;
    time: string;
    inDay?: boolean;
  }>;
}
