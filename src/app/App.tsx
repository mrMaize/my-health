import { FC, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { GuestLayout, UserLayout } from '../layouts';
import { ModalController } from '../shared/modal-controller';
import { AnalyzeModal, ANALYZE_MODAL_TYPE } from '../entities/analyze/ui';
import { useIsAuth } from '../entities/auth/model/selectors';

import { guestRoutesMap, userRoutesMap } from './routes/routes';
import { Providers } from './providers';

const AppInner: FC = () => {
  const isAuth = useIsAuth();

  if (isAuth) {
    return (
      <UserLayout>
        <Suspense fallback="Загрузка...">
          <Routes>
            {userRoutesMap.map((route) => (
              <Route
                // куда
                path={route?.path}
                // ключ, поскольку у нас .map()
                key={route?.path}
                // что рисуем на конкретном урле в браузере
                element={<route.component />}
              />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
        <ModalController type={ANALYZE_MODAL_TYPE} component={AnalyzeModal} />
      </UserLayout>
    );
  }

  return (
    <GuestLayout>
      <Suspense fallback="Загрузка...">
        <Routes>
          {guestRoutesMap.map((route) => (
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
