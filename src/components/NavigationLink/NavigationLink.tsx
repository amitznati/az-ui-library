import React from 'react';

// eslint-disable-next-line no-unused-vars
import { NavigationLinkProps } from './NavigationLink.types';
// @ts-ignore
import styles from '../../styles/abstracts/_variables.scss';

import './NavigationLink.scss';

const NavigationLink: React.FC<NavigationLinkProps> = ({
  linkTo,
  children,
  size = 'medium',
  rounded,
  backgroundColor = 'transparent',
  textColor = styles.whiteColor,
  backgroundColorHover = styles.whiteColor,
  textColorHover = styles.primaryColor,
  className
}) => {
  const [isHover, setIsHover] = React.useState(false);
  const customStyle = {
    color: isHover ? textColorHover : textColor,
    backgroundImage: `linear-gradient(120deg, ${backgroundColor} 0%, ${backgroundColor} 50%, ${backgroundColorHover} 51%)`
  };
  return (
    <a
      href={linkTo}
      className={`navigation__link
      ${size ? `navigation__link--${size}` : ''}
      ${rounded ? 'navigation__link--rounded' : ''}
      ${className}
      `}
      style={customStyle}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {children}
    </a>
  );
};

export default NavigationLink;
