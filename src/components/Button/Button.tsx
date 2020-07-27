import React from 'react';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({
  onClick,
  variant = 'white',
  children = 'Button',
  size = 'medium',
  rounded,
  className
}) => {
  let finalClassName = `btn btn-${variant}`;

  if (variant === 'text') {
    finalClassName = 'btn-text';
  }
  if (className) {
    finalClassName += ` ${className}`;
  }

  return (
    <button
      onClick={onClick}
      className={`${finalClassName}
      ${size ? `btn--${size}` : ''}
      ${rounded ? 'btn--rounded' : ''}
      `}
    >
      {children}
    </button>
  );
};
export default Button;
