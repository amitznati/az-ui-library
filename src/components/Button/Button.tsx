import React from 'react';
import { ButtonProps } from './Button.types';
import styled from 'styled-components';

const getSize = (size): string => {
  switch (size) {
    case 'large':
      return `font-size: 2.5rem;
    padding: 2rem 3.5rem;`;
    case 'medium':
      return `font-size: 1.6rem;
    padding: 1.5rem 2.5rem;`;
    case 'small':
      return `font-size: 1.2rem;
    padding: 1rem 2rem;`;
    case 'tiny':
      return `font-size: .8rem;
    padding: .5rem 1rem;`;
    default:
      return `font-size: 1.6rem;
      padding: 1.5rem 2.5rem;`;
  }
};

const getColor = (props): string => {
  const variant = props.variant;
  const { grey, white, primary, secondary, tertiary } =
    props.theme.colors || {};
  if (!variant) {
    return `color: ${grey || '#777'};
    background-color: ${white || '#fff'};`;
  }
  if (typeof variant === 'object') {
    return `color: ${variant.text || white};
    background-color: ${variant.bg || primary};`;
  }
  switch (props.variant) {
    case 'primary':
      return `color: ${white || '#fff'};
    background-color: ${primary || '#8e3032'};`;
    case 'secondary':
      return `color: ${grey || '#777'};
    background-color: ${secondary || '#F3EDD0'};`;
    case 'tertiary':
      return `color: ${grey || '#777'};
    background-color: ${tertiary || '#79d239'};`;
    default:
      return `color: ${grey || '#777'};
    background-color: ${variant};`;
  }
};

const StyledButton = styled.button`
  &,
  &:link,
  &:visited {
    text-decoration: none;
    text-transform: uppercase;
    display: inline-block;
    border-radius: ${(props): string => (props.rounded ? '100px' : '3px')};
    transition: all 0.2s;
    position: relative;
    top: 0;
    border: none;
    cursor: pointer;
    line-height: 1;
    box-shadow: none;
  }
  ${(props): string => getSize(props.size)}
  ${(props): string => getColor(props)}
  ${(props): string =>
    props.withHoverEffect
      ? `&:after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: all 0.4s;
    ${getColor(props)};
    border-radius: ${props.rounded ? '100px' : '3px'};
  }`
      : ''}

  @media (hover: hover) {
    &:hover {
      top: -0.2rem;
      z-index: 2;
      box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.4);
      ${(props): string =>
        props.withHoverEffect
          ? `&::after {
        transform: scale(1.4, 1.6);
        opacity: 0;
      }`
          : ''}
    }
  }

  &:active,
  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(-0.1rem);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.4);
  }

  &-animated {
    animation: moveInBottom 0.5s ease-out 0.75s;
    animation-fill-mode: backwards;
  }
`;

const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />;
};
export default Button;
