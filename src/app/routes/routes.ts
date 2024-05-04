import { TRoutesMap } from './interfaces/interfaces';
import { loginRoutes } from './loginRoutes';
import { profileRoutes } from './profileRoutes';

import { lazy } from 'react';

import { STARTING_PAGE_ROUT } from '../../shared/routes';

export const startingAppRoutes: TRoutesMap = [
  {
    name: 'userLogin',
    path: STARTING_PAGE_ROUT,
    component: lazy(() => import('../../pages/starting/StartingPage')),
  },
];

export const userRoutesMap: TRoutesMap = [
  ...profileRoutes,
  ...startingAppRoutes,
];

export const guestRoutesMap: TRoutesMap = [
  ...loginRoutes,
  ...startingAppRoutes,
];
