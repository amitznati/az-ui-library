import React from 'react';

export interface LinkHoverProps {
  backgroundColorHover?: string;
  backgroundColor?: string;
  textColor?: string;
  textColorHover?: string;
}
export interface NavigationLinkProps extends LinkHoverProps {
  onClick?: any;
  size?: 'tiny' | 'small' | 'medium' | 'large';
  rounded?: boolean;
  className?: string;
  linkTo: string;
  active?: boolean;
  linkComponent?: {
    comp: React.FC;
    props: any;
  };
}
