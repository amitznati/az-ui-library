import React from 'react';
import { useMediaQuery } from './index';

export default {
  title: 'Hooks'
};
export const UseMediaQuery = (): JSX.Element => {
  const isPhone = useMediaQuery('(max-width: 37.5em)');
  const isTabPort = useMediaQuery('(max-width: 56.25em)');
  const isTabLand = useMediaQuery('(max-width: 75em)');
  const isBigDesk = useMediaQuery('(min-width: 112.5em)');
  return (
    <div>
      <p>is phone (max-width: 37.5em) - {isPhone ? 'true' : 'false'}</p>
      <p>
        is tablet portrait (max-width: 56.25em) - {isTabPort ? 'true' : 'false'}
      </p>
      <p>
        is tablet landscape (max-width: 75em) - {isTabLand ? 'true' : 'false'}
      </p>
      <p>
        is big desktop (min-width: 112.5em) - {isBigDesk ? 'true' : 'false'}
      </p>
    </div>
  );
};
