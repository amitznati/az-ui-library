export interface AppBarProps {
  logoSrc: string;
  title: string;
  navigationLinks: Array<{ title: string; to: string; active?: boolean }>;
}
