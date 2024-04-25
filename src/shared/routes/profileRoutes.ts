import { lazy } from 'react';

import { TRoutesMap } from './interfaces';

export const profileRoutes: TRoutesMap = [
  {
    name: 'profile',
    path: '/health/profile',
    component: lazy(() => import('../../pages/profile/Profile')),
  },
];
