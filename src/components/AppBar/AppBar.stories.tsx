import React from 'react';
import AppBar from './AppBar';
import * as logo from '../../styles/assets/images/ic_launcher_round.png';

export default {
  title: 'AppBar',
  component: AppBar,
  decorators: [
    (story: () => React.ReactNode) => (
      <div className="story-wrap-AppBar">{story()}</div>
    )
  ]
};

export const AppBarWidget = () => {
  const navigationLinks = [
    { title: 'בית', to: '#' },
    { title: 'זמני היום', to: '#', active: true },
    { title: 'תפילה קרובה', to: '#' },
    { title: 'אודות', to: '#' }
  ];
  return (
    <AppBar
      navigationLinks={navigationLinks}
      logoSrc={logo}
      title="זמני היום"
    />
  );
};
