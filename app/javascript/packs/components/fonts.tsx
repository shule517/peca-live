import { createGlobalStyle } from 'styled-components';
// import roboto300 from '../fonts/JF-Dot-Shinonome-14-Regular.woff';

const Fonts = createGlobalStyle`
  /* roboto-300normal - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-display: swap;
    font-weight: 300;
    src:
      local('Roboto Light'),
      local('Roboto-Light'),
      url('/fonts/JF-Dot-Shinonome-14-Regular.woff') format('woff');
  }
`;

export default Fonts;
