import React from 'react';

import Navigation from './Navigation';

export default {
  title: 'Navigation',
  component: Navigation
};
export const fullscreenNavigation = () => {
  const navigationLinks = [
    { title: 'בית', to: '#' },
    { title: 'זמני היום', to: '#' },
    { title: 'תפילה קרובה', to: '#' },
    { title: 'אודות', to: '#' }
  ];
  return <Navigation navigationLinks={navigationLinks} />;
};
