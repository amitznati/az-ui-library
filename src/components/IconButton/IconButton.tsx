import React from 'react';
import styled from 'styled-components';
import { IconButtonProps } from './IconButton.types';
import { getColor } from '../GlobalStyles/utils';
import { mediaQueries } from '../GlobalStyles/mixing';
import defaultTheme from '../GlobalStyles/defaultTheme';

const getStyledIconButton = (props): string => {
  const theme = { ...defaultTheme, ...props.theme };
  const { variant } = props;
  let textColor = props.textColor || getColor('white', props);
  let textColorHover = props.textColorHover || getColor('primary', props);
  let backgroundColor = props.backgroundColor || 'transparent';
  let backgroundColorHover = props.backgroundColorHover || getColor('white', props);
  if (variant) {
    switch (variant) {
      case 'primary': {
        textColor = getColor('white', props);
        textColorHover = getColor('primary', props);
        backgroundColor = getColor('primary', props);
        backgroundColorHover = getColor('white', props);
        break;
      }
      case 'secondary': {
        textColor = getColor('black', props);
        textColorHover = getColor('secondary', props);
        backgroundColor = getColor('secondary', props);
        backgroundColorHover = getColor('white', props);
        break;
      }
      default:
        break;
    }
  }
  const activeStyle = `
    background-position: 100%;
    color: ${textColorHover};
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
    ${backgroundColor} 0%,
    ${backgroundColor} 50%,
    ${backgroundColorHover} 51%
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
        fill: ${textColorHover};
      }
    }
  }
  & svg {
    transition: all 1s cubic-bezier(0.2, 0.68, 0.09, 1);
    height: ${(props.size / 3) * 0.2}rem;
    width: ${(props.size / 3) * 0.2}rem;
    fill: ${textColor};
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
