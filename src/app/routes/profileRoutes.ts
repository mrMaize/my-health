import { lazy } from 'react';

import { TRoutesMap } from './interfaces/interfaces';
import { EProfileRoutes } from '../../shared/routes';

export const profileRoutes: TRoutesMap<EProfileRoutes> = [
  {
    name: 'profile',
    path: EProfileRoutes.PROFILE_PAGE,
    component: lazy(() => import('../../pages/profile/Profile')),
  },
];
