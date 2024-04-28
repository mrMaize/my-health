import { FC, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Providers } from './providers';
import { routesMap } from './routes/routes';
import { GuestLayout } from '../layouts';
import { useCheckUserAuth } from '../shared/hooks/userAuth/useCheckUserAuth';

const AppInner: FC = () => {
  useCheckUserAuth();

  return (
    <GuestLayout>
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
    </GuestLayout>
  );
};

const App = () => {
  return (
    <Providers>
      <AppInner />
    </Providers>
  );
};

export { App };
