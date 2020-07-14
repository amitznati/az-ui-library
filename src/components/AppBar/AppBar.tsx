import React from 'react';
// eslint-disable-next-line no-unused-vars
import { AppBarProps } from './AppBar.types';

import './AppBar.scss';
import NavigationLink from '../NavigationLink/NavigationLink';
// @ts-ignore
import * as logo from '../../styles/assets/images/ic_launcher_round.png';

const AppBar: React.FC<AppBarProps> = ({ children }) => (
  <div className="app-bar">
    {children}
    <div className="app-bar__icon">
      <img src={logo} className="app-bar__icon--image" alt="logo" />
    </div>
    <div className="app-bar__page-title">
      <h1>זמני היום</h1>
    </div>
    <div className="app-bar__navigation-links">
      <NavigationLink className="app-bar__navigation-links--link" linkTo="#">
        בית
      </NavigationLink>
      <NavigationLink className="app-bar__navigation-links--link" linkTo="#">
        זמני היום
      </NavigationLink>
      <NavigationLink className="app-bar__navigation-links--link" linkTo="#">
        תפילה קרובה
      </NavigationLink>
      <NavigationLink className="app-bar__navigation-links--link" linkTo="#">
        אודות
      </NavigationLink>
    </div>
  </div>
);

export default AppBar;
