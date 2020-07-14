export interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: 'primary' | 'secondary' | 'white' | 'text';
  size?: 'tiny' | 'small' | 'medium' | 'large';
  rounded?: boolean;
  linkTo?: string;
  className?: string;
}
