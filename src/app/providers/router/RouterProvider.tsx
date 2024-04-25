import { FC, PropsWithChildren } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { routesMap } from '../../../shared/routes/routes';

const RouterProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
      <Routes>
        {routesMap.map((route) => (
          <Route
            path={route?.path}
            key={route?.path}
            element={<route.component />}
          />
        ))}

        <Route path="/" element={<Navigate to="/profile" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterProvider;
