import React from 'react';

// eslint-disable-next-line no-unused-vars
import { NavigationLinkProps } from './NavigationLink.types';

import './NavigationLink.scss';

const NavigationLink: React.FC<NavigationLinkProps> = ({
  linkTo,
  children,
  size = 'medium',
  rounded,
  backgroundColor = 'transparent',
  textColor = '#ffffff',
  backgroundColorHover = '#ffffff',
  textColorHover = '#8e3032',
  className,
  active
}) => {
  const [isHover, setIsHover] = React.useState(false);
  const customStyle = {
    color: isHover || active ? textColorHover : textColor,
    backgroundImage: `linear-gradient(120deg, ${backgroundColor} 0%, ${backgroundColor} 50%, ${backgroundColorHover} 51%)`
  };
  const cls = [
    'navigation__link',
    size ? `navigation__link--${size}` : '',
    rounded ? 'navigation__link--rounded' : '',
    active ? ' active' : '',
    className
  ];
  return (
    <a
      href={linkTo}
      className={cls.join(' ')}
      style={customStyle}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {children}
    </a>
  );
};

export default NavigationLink;
