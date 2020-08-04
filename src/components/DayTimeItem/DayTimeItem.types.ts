import { CSSProperties } from 'react';

export interface DayTimeItemProps {
  hour: string;
  name: string;
  desc?: string;
  inDayTime?: boolean;
  inNightTime?: boolean;
  className?: string;
  style?: CSSProperties;
}
