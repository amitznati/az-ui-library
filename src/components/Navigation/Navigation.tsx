import React from 'react';

// eslint-disable-next-line no-unused-vars
import { NavigationProps } from './Navigation.types';
import NavigationLink from '../NavigationLink/NavigationLink';
import './Navigation.scss';

const Navigation: React.FC<NavigationProps> = ({
  navigationLinks,
  className
}) => {
  const [buttonClass, setButtonClass] = React.useState('');
  return (
    <div className={`navigation ${className}`}>
      <input type="checkbox" className="navigation__checkbox" id="navigation" />
      <label
        htmlFor="navigation"
        onMouseOver={() => setButtonClass('hover')}
        onMouseLeave={() => setButtonClass('')}
        onTouchEnd={() => setButtonClass('')}
        className={`navigation__button ${buttonClass}`}
      >
        <span className="navigation__icon">&nbsp;</span>
      </label>
      <div className="navigation__bg">&nbsp;</div>
      <div className="navigation__nav">
        <ul className="navigation__list">
          {navigationLinks.map((link) => (
            <li key={link.title} className="navigation__item">
              <NavigationLink linkTo={link.to}>{link.title}</NavigationLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Navigation;
