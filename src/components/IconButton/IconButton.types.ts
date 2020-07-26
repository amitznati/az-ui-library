import React from 'react';

export interface IconButtonProps {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  iconHref?: string;
  IconSrc?: React.FC<React.SVGProps<SVGSVGElement>>;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
  backgroundColorHover?: string;
  iconColorHover?: string;
  style?: object;
  className?: string;
}
