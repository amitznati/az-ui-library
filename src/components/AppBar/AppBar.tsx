import React from 'react';
import styled from 'styled-components';
import { AppBarProps } from './AppBar.types';
import { getColor } from '../GlobalStyles/utils';

import NavigationLink from '../NavigationLink/NavigationLink';
import Navigation from '../Navigation/Navigation';

const StyledAppBar = styled.div`
  position: relative;
  top: 0;
  left: 0;
  height: 13rem;
  width: 100%;
  background-color: ${(props): string => getColor('primary', props)};
  box-shadow: 0 0.2rem 1rem ${(props): string => getColor('black', props)};
  z-index: 1500;
  @media (max-width: 37.5em) {
    height: 8rem;
    position: fixed;
  }
`;
const StyledAppBarIcon = styled.div`
  position: absolute;
  left: 3rem;
  top: 3rem;
  @media (max-width: 37.5em) {
    top: 1.8rem;
  }
`;
const StyledAppBarIconImage = styled.img`
  height: 7rem;
  @media (max-width: 37.5em) {
    height: 5rem;
  }
`;
const StyledAppBarPageTitle = styled.div`
  text-align: center;
  font-size: 5rem;
  color: ${(props): string => getColor('white', props)};
  line-height: 1;
  padding-top: 2.5rem;
  @media (max-width: 37.5em) {
    padding-top: 2rem;
    font-size: 4rem;
  }
`;
const StyledAppBarNavigationLinks = styled.div`
  display: flex;
  transform: translateX(-50%);
  justify-content: center;
  flex-direction: row-reverse;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  width: 100%;
  & .app-bar__navigation-links--link {
    margin: 0 1.5rem;
  }
  @media (max-width: 37.5em) {
    display: none;
  }
`;

const AppBar: React.FC<AppBarProps> = ({ logoSrc, title, navigationLinks }) => {
  return (
    <StyledAppBar>
      <StyledAppBarIcon>
        <StyledAppBarIconImage src={logoSrc} alt="logo" />
      </StyledAppBarIcon>
      <StyledAppBarPageTitle>{title}</StyledAppBarPageTitle>
      <StyledAppBarNavigationLinks>
        {navigationLinks.map((link) => (
          <NavigationLink
            {...link}
            key={link.title}
            size="small"
            className="app-bar__navigation-links--link"
            linkTo={link.to}
            active={link.active}
          >
            {link.title}
          </NavigationLink>
        ))}
      </StyledAppBarNavigationLinks>
      <Navigation navigationLinks={navigationLinks} />
    </StyledAppBar>
  );
};

export default AppBar;
