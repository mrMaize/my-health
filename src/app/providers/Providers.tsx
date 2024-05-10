import { FC, PropsWithChildren } from 'react';

import { ThemeProvider } from './theme';
import RouterProvider from './router/RouterProvider';
import { AuthProvider } from './auth/AuthProvider';
import { ModalProvider } from './modal/ModalProvider';
import { StoreProvider } from './store/StoreProvider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <ModalProvider>
        <ThemeProvider>
          <RouterProvider>
            <AuthProvider>{children}</AuthProvider>
          </RouterProvider>
        </ThemeProvider>
      </ModalProvider>
    </StoreProvider>
  );
};

export { Providers };
