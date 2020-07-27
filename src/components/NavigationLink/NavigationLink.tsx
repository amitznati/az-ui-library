import React from 'react';
import { NavigationLinkProps } from './NavigationLink.types';

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
  active,
  linkComponent
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
  if (linkComponent) {
    const LinkComp = linkComponent.comp;
    return (
      <LinkComp
        className={cls.join(' ')}
        style={customStyle}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        {...linkComponent.props}
      >
        {children}
      </LinkComp>
    );
  }
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
