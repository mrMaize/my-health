import { lazy } from 'react';

import { TRoutesMap } from './interfaces';

export const loginRoutes: TRoutesMap = [
  {
    name: 'userLogin',
    path: '/login',
    component: lazy(() => import('../../pages/login/LoginPage')),
  },
  {
    name: 'userRegister',
    path: '/register',
    component: () => null,
  },
  {
    name: 'userForgotPassword',
    path: '/password-reset',
    component: () => null,
  },
];
