import { lazy } from 'react';

import { EProfileRoutes, TRoutesMap } from './interfaces/interfaces';

export const profileRoutes: TRoutesMap<EProfileRoutes> = [
  {
    name: 'profile',
    path: EProfileRoutes.PROFILE_PAGE,
    component: lazy(() => import('../../pages/profile/Profile')),
  },
];
