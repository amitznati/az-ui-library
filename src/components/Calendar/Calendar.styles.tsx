import styled from 'styled-components';
import { getColor, getColorRGB } from '../GlobalStyles/utils';
import { mediaQueries } from '../GlobalStyles/mixing';

export const StyledCalendarContainer = styled.div`
  overflow: hidden;
  background-color: ${(props): string => getColor('primary', props)};
`;

export const StyledCalendarSelectedDate = styled.div`
  font-size: 2rem;
  text-align: center;
  color: ${(props): string => getColor('white', props)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  position: relative;
  padding: 2rem;
  box-shadow: 0 2px 4px
    rgba(${(props): string => getColorRGB('black', props)}, 0.3);
`;

export const StyledCalendarExpandIcon = styled.div`
  .calendar-expand-icon__icon {
    svg {
      transform: rotate(90deg);
    }
    ${(props): string =>
      props.isOpen
        ? `
      svg {
        transform: rotate(-90deg);
      }
    `
        : ''}
  }
`;

export const StyledCalendarMain = styled.div`
  height: 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s;
  ${(props): string =>
    props.isOpen
      ? `${mediaQueries.phone} {
      height: 67rem;
    }
    height: 70rem;
    opacity: 1;
    visibility: visible;`
      : ''}
`;

export const StyledCalendarHeader = styled.div`
  text-align: center;
  padding: 1rem 0;
  font-size: 2.5rem;
  color: ${(props): string => getColor('white', props)};
  line-height: 1.4;

  .calendar-header-month {
    display: inline-flex;
    width: 90%;
    justify-content: space-between;
    .arrow-up {
      svg {
        transform: rotate(180deg);
      }
    }
    .calendar-header-text {
    }
  }
  .calendar-header-month-he {
    margin: 0 0 0 1rem;
  }
  .calendar-header-year {
    cursor: pointer;
  }
`;

export const StyledCalendarWeek = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
`;
export const StyledCalendarWeekDays = styled(StyledCalendarWeek)`
  background-color: ${(props): string => getColor('white', props)};
  padding: 0 1rem;
  margin-bottom: 1rem;
  box-shadow: ${(props): string => props.theme.shadows.hover};
`;

export const StyledCalendarMonthContainer = styled.div`
  margin: 1rem 0;
`;

export const StyledCalendarMonth = styled.div`
  background-color: ${(props): string => getColor('white', props)};
  border-radius: 0.6rem;
  box-shadow: ${(props): string => props.theme.shadows.active};
  overflow: hidden;

  ${mediaQueries.phone} {
    padding: 0;
  }
`;

export const StyledCalendarMonthPlaceholder = styled(StyledCalendarMonth)`
  height: 48rem;
`;

export const StyledCalendarDay = styled.div`
  border-bottom: 1px solid
    rgba(${(props): string => getColorRGB('primaryDark', props)}, 0.12);
  border-right: 1px solid
    rgba(${(props): string => getColorRGB('primaryDark', props)}, 0.12);
  text-align: right;
  padding: 1rem;
  letter-spacing: 1px;
  background-color: ${(props): string => getColor('white', props)};
  font-size: 1rem;
  box-sizing: border-box;
  color: ${(props): string => getColor('primaryDark', props)};
  width: calc(100% / 7);
  display: inline-flex;
  flex-direction: column;
  height: 8rem;
  margin: 0;
  cursor: pointer;
  line-height: 1.2;
  overflow: hidden;
  justify-content: space-between;

  .day-dates {
    display: inline-flex;
    justify-content: space-between;
    flex-direction: column;
    font-size: 1.5rem;
  }

  ${mediaQueries.tabPort} {
    padding: 1rem;
    font-size: 1.2rem;
  }
  ${mediaQueries.phone} {
    padding: 0.5rem;
    margin: 0;
    box-shadow: none;
    width: calc(100% / 7);
    letter-spacing: unset;
  }

  @media (hover: hover) {
    &:hover {
      box-shadow: ${(props): string => props.theme.shadows.hover};
      transform: scale(1.1);
      z-index: 3;
    }
  }


  ${(props): string =>
    props.isDisable
      ? `
    color: rgba(${getColorRGB('#98a0a6', props)}, 0.6);
    background-color: ${getColor('greyLight', props)};
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f9f9fa' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
  `
      : ''}
  ${(props): string =>
    props.isNow ? `background-color: ${getColor('secondary', props)};` : ''}
  ${(props): string =>
    props.isSelected ? `border: 3px solid ${getColor('primary', props)};` : ''}
`;

export const StyledCalendarDayName = styled.div`
  font-size: 1.4rem;
  text-transform: uppercase;
  color: ${(props): string => getColor('primaryDark', props)};
  text-align: center;
  line-height: 5rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
  width: calc(100% / 7);
`;
