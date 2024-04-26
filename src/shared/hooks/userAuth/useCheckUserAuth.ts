import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

import localStorageManager from '../../localStorage/localStorageManager';
import { ELoginRoutes } from '../../routes/interfaces/interfaces';
import { PUBLIC_ROUTES } from '../../routes/routes';

import { AUTH_REFRESH_TOKEN } from './constants';

export const useCheckUserAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const refreshToken = localStorageManager.getValue(AUTH_REFRESH_TOKEN);

  const isPublicRoute = useMemo(
    () => PUBLIC_ROUTES.some((route) => route === location.pathname),
    [location]
  );

  useEffect(() => {
    if (isPublicRoute) {
      return;
    } else {
      if (refreshToken) {
        return;
      }

      if (!refreshToken) {
        console.log('we go after login to:', {
          urlToGoAfter: location.pathname,
        });

        navigate(ELoginRoutes.LOGIN_PAGE, {
          state: {
            urlToGoAfter: location.pathname,
          },
        });
      }
    }
  }, [isPublicRoute, refreshToken, navigate]);
};
