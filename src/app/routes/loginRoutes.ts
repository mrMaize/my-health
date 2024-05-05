import { lazy } from 'react';

import { ELoginRoutes } from '../../shared/routes';

import { TRoutesMap } from './interfaces/interfaces';

export const loginRoutes: TRoutesMap = [
  {
    name: 'userLogin',
    path: ELoginRoutes.LOGIN_PAGE,
    component: lazy(() => import('../../pages/login/LoginPage')),
  },
  {
    name: 'userRegister',
    path: ELoginRoutes.REGISTER_PAGE,
    component: lazy(() => import('../../pages/registration/RegisterPage')),
  },
];
