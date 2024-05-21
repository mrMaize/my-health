import { lazy } from 'react';

import { routes } from '../../shared/routes';

import { TRoutesMap } from './interfaces/interfaces';

export const profileRoutes: TRoutesMap = [
  {
    name: 'profile',
    path: routes.user.userProfilePage,
    component: lazy(() => import('../../pages/profile/Profile')),
  },
];
