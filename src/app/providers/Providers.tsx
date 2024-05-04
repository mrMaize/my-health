import { FC, PropsWithChildren } from 'react';

import { ThemeProvider } from './theme';
import RouterProvider from './router/RouterProvider';
import { AuthProvider } from './auth/AuthProvider';
import { ModalProvider } from '../../shared/modal-controller';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ModalProvider>
      <ThemeProvider>
        <RouterProvider>
          <AuthProvider>{children}</AuthProvider>
        </RouterProvider>
      </ThemeProvider>
    </ModalProvider>
  );
};

export { Providers };
