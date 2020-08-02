import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { mediaQueries } from '../GlobalStyles/mixing';

const StyledCssBaseLine = createGlobalStyle`
  *,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
  font-family: inherit;
}
html {
  font-size: 62.5%; //1rem = 10px - 10px/16px = 62.5%

  ${mediaQueries.tabLand} { //width < 1200px
    font-size: 56.25%;// 1rem = 9px - 9px/16px = 56.25%
  }
  ${mediaQueries.tabPort} { //width < 900px
    font-size: 50%; // 1rem = 8px - 8px/16px = 50%
  }

  ${mediaQueries.bigDesktop} {//width > 2000px
    font-size: 75%;// 1rem = 12px - 12px/16px = 75%
  }
}
body {
  margin: 0;
  font-family: ${(props): string => props.theme.fontFamily.join(', ')};
  font-weight: 400;
  line-height: 1.7;
  color: ${(props): string =>
    props.theme.defaultColor ||
    (props.theme.colors && props.theme.colors.gray) ||
    '#777'};
  ${mediaQueries.phone} {
    padding-top: 8rem;
  }
  box-sizing: border-box;
}

::selection {
  background-color: ${(props): string =>
    props.theme.colorPrimaryLight || 'blue'};
}
`;

const CssBaseLine = () => <StyledCssBaseLine />;
export default CssBaseLine;
