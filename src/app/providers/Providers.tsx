import { FC, PropsWithChildren } from 'react';

import { ThemeProvider } from './theme';
import RouterProvider from './router/RouterProvider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <RouterProvider>{children}</RouterProvider>
    </ThemeProvider>
  );
};

export { Providers };
