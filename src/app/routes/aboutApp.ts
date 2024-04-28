import { lazy } from 'react';

import { TRoutesMap } from './interfaces/interfaces';
import { EAboutAppRoutes } from '../../shared/routes';

export const aboutAppRoutes: TRoutesMap<EAboutAppRoutes> = [
  {
    name: 'userLogin',
    path: EAboutAppRoutes.ABOUT_PAGE,
    component: lazy(() => import('../../pages/about/About')),
  },
];
