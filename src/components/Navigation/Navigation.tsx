import React from 'react';

// eslint-disable-next-line no-unused-vars
import { NavigationProps } from './Navigation.types';
import NavigationLink from '../NavigationLink/NavigationLink';
import './Navigation.scss';

const Navigation: React.FC<NavigationProps> = () => (
  <div className="navigation">
    <input type="checkbox" className="navigation__checkbox" id="navigation" />
    <label htmlFor="navigation" className="navigation__button">
      <span className="navigation__icon">&nbsp;</span>
    </label>
    <div className="navigation__bg">&nbsp;</div>
    <div className="navigation__nav">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavigationLink linkTo="#">Home</NavigationLink>
        </li>
        <li className="navigation__item">
          <NavigationLink linkTo="#">Company</NavigationLink>
        </li>
        <li className="navigation__item">
          <NavigationLink linkTo="#">Popular packages</NavigationLink>
        </li>
        <li className="navigation__item">
          <NavigationLink linkTo="#">Stories</NavigationLink>
        </li>
        <li className="navigation__item">
          <NavigationLink linkTo="#">Register now</NavigationLink>
        </li>
      </ul>
    </div>
  </div>
);

export default Navigation;
