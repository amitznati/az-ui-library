import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'white'
    | string
    | { bg: string; text: string };
  size?: 'tiny' | 'small' | 'medium' | 'large';
  rounded?: boolean;
  withHoverEffect?: boolean;
}
