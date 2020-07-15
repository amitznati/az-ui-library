import React from 'react';
// eslint-disable-next-line no-unused-vars
import { AppBarProps } from './AppBar.types';

import './AppBar.scss';
import NavigationLink from '../NavigationLink/NavigationLink';
import Navigation from '../Navigation/Navigation';

const AppBar: React.FC<AppBarProps> = ({ logoSrc, title, navigationLinks }) => {
  const [navigationClass, setNavigationClass] = React.useState('');
  const myScrollFunc = () => {
    setNavigationClass(window.scrollY > 100 ? 'shown' : '');
  };
  React.useEffect(() => {
    window.addEventListener('scroll', myScrollFunc);
    return () => window.removeEventListener('scroll', myScrollFunc);
  });
  return (
    <div className="app-bar" onScrollCapture={() => console.log('scroll')}>
      <div className="app-bar__icon">
        <img src={logoSrc} className="app-bar__icon--image" alt="logo" />
      </div>
      <h1 className="app-bar__page-title">{title}</h1>
      <div className="app-bar__navigation-links">
        {navigationLinks.map((link) => (
          <NavigationLink
            key={link.title}
            size="small"
            className="app-bar__navigation-links--link"
            linkTo={link.to}
            active={link.title === 'זמני היום'}
          >
            {link.title}
          </NavigationLink>
        ))}
      </div>
      <Navigation
        className={navigationClass}
        navigationLinks={navigationLinks}
      />
    </div>
  );
};

export default AppBar;
