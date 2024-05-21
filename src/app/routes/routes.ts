import { lazy } from 'react';

import { routes } from '../../shared/routes';

import { IRoute, TRoutesMap } from './interfaces/interfaces';
import { loginRoutes } from './loginRoutes';
import { profileRoutes } from './profileRoutes';
import { medicalResultsRoutes } from './medicalResultsRoutes';

export const startingAppRoutes: IRoute = {
  name: 'starting page',
  path: routes.starting.startingPage,
  component: lazy(() => import('../../pages/starting/StartingPage')),
};

export const userRoutesMap: TRoutesMap = [
  ...profileRoutes,
  ...medicalResultsRoutes,
  startingAppRoutes,
];

export const guestRoutesMap: TRoutesMap = [...loginRoutes, startingAppRoutes];
