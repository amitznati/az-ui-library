export interface NavigationProps {
  navigationLinks: Array<{ title: string; to: string; active?: boolean }>;
  className?: string;
}
