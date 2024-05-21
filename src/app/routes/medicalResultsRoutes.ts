import { lazy } from 'react';

import { routes } from '../../shared/routes';

import { TRoutesMap } from './interfaces/interfaces';

export const medicalResultsRoutes: TRoutesMap = [
  {
    name: 'medical results main',
    path: routes.medResults.mainPage,
    component: lazy(() => import('../../pages/medicalResults/MedicalResults')),
  },
];
