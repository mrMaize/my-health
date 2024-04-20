import { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from './theme';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export { Providers };
