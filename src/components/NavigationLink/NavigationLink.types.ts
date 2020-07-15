export interface NavigationLinkProps {
  onClick?: any;
  backgroundColorHover?: string;
  backgroundColor?: string;
  textColor?: string;
  textColorHover?: string;
  size?: 'tiny' | 'small' | 'medium' | 'large';
  rounded?: boolean;
  className?: string;
  linkTo: string;
  active?: boolean;
}
