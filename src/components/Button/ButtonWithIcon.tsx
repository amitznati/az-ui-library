import React from 'react';
import Button from './Button';
import { ButtonProps } from './Button.types';

interface ButtonWithIconProps extends ButtonProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  iconRight?: boolean;
}
// import { IconButton } from '../../index';
const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  icon: Icon,
  iconRight = false,
  children,
  ...rest
}) => {
  let iconHeight = 24;
  switch (rest.size) {
    case 'large':
      iconHeight = 30;
      break;
    case 'small':
      iconHeight = 18;
      break;
    case 'tiny':
      iconHeight = 12;
      break;
  }
  return (
    <div>
      <Button {...rest}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!iconRight && (
            <Icon height={iconHeight} style={{ margin: '0 1rem 2px 0' }} />
          )}
          {children}
          {iconRight && <Icon height={24} style={{ margin: '0 0 2px 1rem' }} />}
        </div>
      </Button>
    </div>
  );
};

export default ButtonWithIcon;
