import React from 'react';
import styled from 'styled-components';
import { IconButtonProps } from './IconButton.types';
import { getColor } from '../GlobalStyles/utils';
import { mediaQueries } from '../GlobalStyles/mixing';
import defaultTheme from '../GlobalStyles/defaultTheme';

const getStyledIconButton = (props): string => {
  const theme = { ...defaultTheme, ...props.theme };
  const activeStyle = `
    background-position: 100%;
    color: ${props.textColorHover || getColor('primary', props)};
    box-shadow: ${theme.shadows.active};
  `;
  return `
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: ${props.size / 10}rem;
  width: ${props.size / 10}rem;
  color: ${props.textColor || getColor('white', props)};
  background-image: linear-gradient(
    120deg,
    ${props.backgroundColor || 'transparent'} 0%,
    ${props.backgroundColor || 'transparent'} 50%,
    ${props.backgroundColorHover || '#fff'} 51%
  );
  background-size: 250%;
  transition: all 1s cubic-bezier(0.2, 0.68, 0.09, 1);
  cursor: pointer;
  line-height: 1;
  ${props.active ? activeStyle : ''}
  ${mediaQueries.hover} {
    &:hover {
      ${activeStyle}
      box-shadow: ${theme.shadows.hover};
      & svg {
        fill: ${props.textColorHover || getColor('primaryDark', props)};
      }
    }
  }
  & svg {
    transition: all 1s cubic-bezier(0.2, 0.68, 0.09, 1);
    height: ${(props.size / 3) * 0.2}rem;
    width: ${(props.size / 3) * 0.2}rem;
    fill: ${props.textColor || getColor('white', props)};
  }
  &:active {
      ${activeStyle}
  }`;
};
const StyledIconButton = styled.div`
  ${(props): string => getStyledIconButton(props)}
`;
const IconButton: React.FC<IconButtonProps> = ({
  iconHref,
  iconSrc: IconSrc,
  ...rest
}) => {
  let iconToRender = <div />;
  if (IconSrc) {
    iconToRender = <IconSrc />;
  } else if (iconHref) {
    iconToRender = (
      <svg>
        <use xlinkHref={iconHref} />
      </svg>
    );
  }
  return <StyledIconButton {...rest}>{iconToRender}</StyledIconButton>;
};
export default IconButton;
