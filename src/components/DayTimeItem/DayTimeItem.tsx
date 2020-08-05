import React from 'react';
import styled from 'styled-components';

import { DayTimeItemProps } from './DayTimeItem.types';
import { getColor } from '../GlobalStyles/utils';

const getStyledDayTimeItemStyle = (props): string => {
  return `
  display: inline-flex;
  flex-direction: row-reverse;
  align-items: center;
  background-color: ${getColor(props.inDayTime ? 'white' : 'black', props)};
  color: ${getColor(props.inDayTime ? 'black' : 'white', props)};
  padding: 1rem 2rem;
  box-shadow: 0 1rem 2rem rgba(${
    props.inDayTime ? '0, 0, 0' : '255, 255, 255'
  }, 0.4);
  width: fit-content;
  border-radius: 100px;
  .day-time-item-hour {
    background-color: ${getColor('primary', props)};
    font-size: 1.6rem;
    border-radius: 30px;
    padding: 0.5rem 1rem;
    display: inline-table;
    color: ${getColor('secondary', props)};
    width: 7rem;
    text-align: center;
  }
  .day-time-item-name {
    font-size: 2.5rem;
  }
  .day-time-item-desc {
    font-size: 1.3rem;
    line-height: 1.3;
  }
  .day-time-item-text-wrap {
    text-align: right;
    margin-right: 1rem;
    line-height: 1;
  }
  `;
};
const StyledDayTimeItem = styled.div`
  ${(props): string => getStyledDayTimeItemStyle(props)}
`;
const DayTimeItem: React.FC<DayTimeItemProps> = ({
  hour,
  name,
  desc,
  ...rest
}) => (
  <StyledDayTimeItem {...rest}>
    <div className="day-time-item-hour">{hour}</div>
    <div className="day-time-item-text-wrap">
      <div className="day-time-item-name">{name}</div>
      {desc && <div className="day-time-item-desc">{desc}</div>}
    </div>
  </StyledDayTimeItem>
);

export default DayTimeItem;
