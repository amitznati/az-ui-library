import React from 'react';
import { IconButtonProps } from './IconButton.types';

const IconButton: React.FC<IconButtonProps> = ({
  iconHref,
  iconSrc: IconSrc,
  size = 50,
  backgroundColor = 'transparent',
  iconColor = '#ffffff',
  backgroundColorHover = '#ffffff',
  iconColorHover = '#8e3032',
  style,
  className,
  onClick
}) => {
  const [isHover, setIsHover] = React.useState(false);
  const customStyle = {
    backgroundImage: `linear-gradient(120deg, ${backgroundColor} 0%, ${backgroundColor} 50%, ${backgroundColorHover} 51%)`,
    ...style
  };
  const color = isHover ? iconColorHover : iconColor;
  const iconSize = (size / 3) * 2;
  let iconToRender = <div />;
  if (IconSrc) {
    iconToRender = <IconSrc height={iconSize} width={iconSize} fill={color} />;
  } else if (iconHref) {
    iconToRender = (
      <svg height={iconSize} width={iconSize} fill={color}>
        <use xlinkHref={iconHref} />
      </svg>
    );
  }
  return (
    <div
      onClick={onClick}
      style={{ height: size, width: size, ...customStyle }}
      className={`icon-button ${className || ''}`}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {iconToRender}
    </div>
  );
};
export default IconButton;
