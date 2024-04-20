import { FC, PropsWithChildren } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { theme } from './theme';
import { GlobalStyles } from './GlobalStyles';

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
};

export { ThemeProvider };
