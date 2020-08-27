import React from 'react';
import { LinkHoverProps } from '../NavigationLink/NavigationLink.types';

export interface IconButtonProps extends LinkHoverProps {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  iconHref?: string;
  iconSrc?: React.FC<React.SVGProps<SVGSVGElement>>;
  size: number;
  style?: object;
  className?: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'white'
    | string
    | { bg: string; text: string };
}
