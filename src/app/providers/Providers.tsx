import { FC, PropsWithChildren } from 'react';

import { ThemeProvider } from './theme';
import RouterProvider from './router/RouterProvider';
import { ModalProvider } from './modal/ModalProvider';
import { StoreProvider } from './store/StoreProvider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <ModalProvider>
        <ThemeProvider>
          <RouterProvider>{children}</RouterProvider>
        </ThemeProvider>
      </ModalProvider>
    </StoreProvider>
  );
};

export { Providers };
