import { lazy } from 'react';

import { EProfileRoutes } from '../../shared/routes';

import { TRoutesMap } from './interfaces/interfaces';

export const profileRoutes: TRoutesMap = [
  {
    name: 'profile',
    path: EProfileRoutes.PROFILE_PAGE,
    component: lazy(() => import('../../pages/profile/Profile')),
  },
];
