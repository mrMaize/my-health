import { lazy } from 'react';

import { STARTING_PAGE_ROUT } from '../../shared/routes';

import { IRoute, TRoutesMap } from './interfaces/interfaces';
import { loginRoutes } from './loginRoutes';
import { profileRoutes } from './profileRoutes';

export const startingAppRoutes: IRoute = {
  name: 'userLogin',
  path: STARTING_PAGE_ROUT,
  component: lazy(() => import('../../pages/starting/StartingPage')),
};

export const userRoutesMap: TRoutesMap = [...profileRoutes, startingAppRoutes];

export const guestRoutesMap: TRoutesMap = [...loginRoutes, startingAppRoutes];
