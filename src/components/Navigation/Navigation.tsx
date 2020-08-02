import React from 'react';
import styled from 'styled-components';
import { NavigationProps } from './Navigation.types';
import NavigationLink from '../NavigationLink/NavigationLink';
import { mediaQueries, absCenter } from '../GlobalStyles/mixing';
import { getColor } from '../GlobalStyles/utils';

const StyledNavigation = styled.div`
  opacity: ${(props): number => (props.shown ? 1 : 0)};
  transition: all 1s;
  visibility: ${(props): string => (props.shown ? 'visible' : 'hidden')};
  ${mediaQueries.phone} {
    opacity: 1;
    visibility: visible;
  }
`;
const StyledNavigationCheckbox = styled.input`
  display: none;
`;
const StyledNavigationButton = styled.label`
  position: fixed;
  top: 6rem;
  right: 6rem;
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
  z-index: 2000;
  background-color: ${(props): string =>
    getColor(props.isOpen ? 'white' : 'primary', props)};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  @media (hover: hover) {
    &:hover {
      box-shadow: ${(props): string => props.theme.shadows.hover};
    }
  }
  &:active {
    box-shadow: ${(props): string => props.theme.shadows.active};
  }

  ${mediaQueries.tabPort} {
    top: 3rem;
    right: 3rem;
    height: 5rem;
    width: 5rem;
  }
  ${mediaQueries.phone} {
    top: 1.8rem;
  }
`;
const StyledNavigationIcon = styled.span`
  position: relative;
  margin-top: 3.5rem;
  ${mediaQueries.tabPort} {
    margin-top: 2.5rem;
  }
  ${(props): string => (props.isOpen ? `background-color: transparent;` : '')}
  &,
    &:before,
    &:after {
    height: 2px;
    width: 3rem;
    background-color: ${(props): string => getColor('white', props)};
    display: inline-block;
    transition: all 0.4s;
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 0;
    ${(props): string =>
      props.isOpen ? `background-color: ${getColor('primary', props)};` : ''}
  }
  &:before {
    top: 0.8rem;
    @media (hover: hover) {
      ${StyledNavigationButton}:hover & {
        ${(props): string => (props.isOpen ? '' : 'top: 1.1rem;')}
      }
    }
    ${(props): string =>
      props.isOpen ? `transform: rotate(135deg); top: 0;` : ''}
  }
  &:after {
    top: -0.8rem;
    @media (hover: hover) {
      ${StyledNavigationButton}:hover & {
        ${(props): string => (props.isOpen ? '' : 'top: -1.1rem;')}
      }
    }
    ${(props): string =>
      props.isOpen ? `transform: rotate(-135deg); top: 0;` : ''}
  }
`;

const StyledNavigationBG = styled.div`
  position: fixed;
  top: 6.5rem;
  right: 6.5rem;
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  background-image: radial-gradient(
    ${(props): string => getColor('primaryLight', props)},
    ${(props): string => getColor('primaryDark', props)}
  );
  z-index: 1000;
  transition: transform 0.8s cubic-bezier(0.51, 0.01, 0.51, 1);

  ${mediaQueries.tabPort} {
    top: 3.2rem;
    right: 3.2rem;
    height: 4.5rem;
    width: 4.5rem;
  }
  ${mediaQueries.phone} {
    top: 1.9rem;
  }
  ${(props): string => (props.isOpen ? `transform: scale(80);` : '')}
`;
const StyledNavigationNav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1500;

  opacity: 0;
  width: 0;
  visibility: hidden;
  transition: all 0.8s cubic-bezier(0.52, -0.28, 0.29, 1.29);
  ${(props): string =>
    props.isOpen
      ? `width: 100%;
    opacity: 1;
    visibility: visible;`
      : ''}
`;

const StyledNavigationList = styled.ul`
  ${absCenter}
  list-style: none;
  text-align: center;
  width: 100%;
  & > li {
    margin: 1rem;
  }
`;

const Navigation: React.FC<NavigationProps> = ({
  navigationLinks,
  className
}) => {
  const [isShown, setIsShown] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const myScrollFunc = (): void => {
    setIsShown(window.scrollY > 160);
  };
  React.useEffect(() => {
    window.addEventListener('scroll', myScrollFunc);
    return (): void => window.removeEventListener('scroll', myScrollFunc);
  });
  const toggleNavigation = (): void => {
    setIsOpen(!isOpen);
  };
  return (
    <StyledNavigation shown={isShown} className={className}>
      <StyledNavigationCheckbox
        type="checkbox"
        id="navigation"
        onChange={toggleNavigation}
      />
      <StyledNavigationButton isOpen={isOpen} htmlFor="navigation">
        <StyledNavigationIcon isOpen={isOpen}>&nbsp;</StyledNavigationIcon>
      </StyledNavigationButton>
      <StyledNavigationBG isOpen={isOpen}>&nbsp;</StyledNavigationBG>
      <StyledNavigationNav isOpen={isOpen}>
        <StyledNavigationList>
          {navigationLinks.map((link) => (
            <li key={link.title}>
              <NavigationLink {...link} linkTo={link.to}>
                {link.title}
              </NavigationLink>
            </li>
          ))}
        </StyledNavigationList>
      </StyledNavigationNav>
    </StyledNavigation>
  );
};
export default Navigation;
