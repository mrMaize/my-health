import { FC, PropsWithChildren, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { routesMap } from '../../../shared/routes/routes';

const RouterProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
      <Suspense fallback={'Загрузка...'}>
        <Routes>
          {routesMap.map((route) => (
            <Route
              path={route?.path}
              key={route?.path}
              element={<route.component />}
            />
          ))}

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RouterProvider;
