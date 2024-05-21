import { lazy } from 'react';

import { routes } from '../../shared/routes';

import { TRoutesMap } from './interfaces/interfaces';

export const loginRoutes: TRoutesMap = [
  {
    name: 'userLogin',
    path: routes.login.loginPage,
    component: lazy(() => import('../../pages/login/LoginPage')),
  },
  {
    name: 'userRegister',
    path: routes.login.registerPage,
    component: lazy(() => import('../../pages/registration/RegisterPage')),
  },
];
