import React from 'react';
import { NavigationLinkProps } from './NavigationLink.types';
import styled from 'styled-components';
import { getColor } from '../GlobalStyles/utils';

const getSize = (size): string => {
  switch (size) {
    case 'large':
      return `font-size: 3.5rem;
    padding: 1rem 2rem;`;
    case 'medium':
      return `font-size: 3rem;
    padding: 0.75rem 1.5rem;`;
    case 'small':
      return `font-size: 2.5rem;
    padding: 0.5rem 1rem;`;
    case 'tiny':
      return `font-size: 1rem;
    padding: 0.25rem 0.5rem;`;
    default:
      return `font-size: 3rem;
    padding: 0.75rem 1.5rem;`;
  }
};
const styleNav = (props): string => `
  &,
  &:link,
  &:visited,
  &:not([href]),
  & > * {
    display: inline-block;
    color: ${getColor(props.textColor || 'white', props)};
    text-decoration: none;
    text-transform: uppercase;
    background-image: linear-gradient(
      120deg,
      ${props.backgroundColor || 'transparent'} 0%,
      ${props.backgroundColor || 'transparent'} 50%,
      ${getColor(props.backgroundColorHover || 'white', props)} 51%
    );
    background-size: 250%;
    transition: all 1s cubic-bezier(0.2, 0.68, 0.09, 1);
    cursor: pointer;
    line-height: 1;
    font-weight: 300;
    ${
      props.active &&
      `
    background-position: 100%;
    color: ${getColor(props.textColorHover || 'primary', props)};
    box-shadow: 0 0.2rem 0 rgba(0, 0, 0, 0.4);`
    }
  }
  ${getSize(props.size)}

  border-radius: ${props.rounded ? '100px' : '0'};
  @media (hover: hover) {
    &:hover,
    &:not([href]):hover,
    &:hover > * {
      background-position: 100%;
      color: ${getColor(props.textColorHover || 'primary', props)};
      box-shadow: 0 .5rem 1rem rgba(0, 0 ,0 ,0.4);
    }
  }
  &:not([href]):active,
  &:active > * {
    background-position: 100%;
    color: ${getColor(props.textColorHover || 'primary', props)};
    box-shadow: 0 0.2rem 0 rgba(0, 0, 0, 0.4);
  }
`;
const StyledNavigationLink = styled.a.attrs((props) => ({
  href: props.to,
  'aria-current': props.active ? 'page' : ''
}))`
  ${(props): string => styleNav(props)}
`;

const NavigationLink: React.FC<NavigationLinkProps> = ({
  linkComponent,
  active,
  ...rest
}) => {
  if (linkComponent) {
    // const LinkComp = linkComponent.comp;
    const LinkComp = styled(linkComponent.comp)`
      ${(props): string => styleNav({ ...props, ...rest, active })}
    `;
    return (
      <LinkComp
        {...linkComponent.props}
        className={[linkComponent.props.className, rest.className].join(' ')}
      >
        {rest.children}
      </LinkComp>
    );
  }
  return <StyledNavigationLink aria-current="page" {...rest} active={active} />;
};

export default NavigationLink;
