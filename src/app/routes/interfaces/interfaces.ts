import { ComponentType } from 'react';

import { ELoginRoutes, EProfileRoutes, EAboutAppRoutes } from '../../../shared/routes';

interface IRoute<S> {
  name: string;
  path?: S;
  component: ComponentType<React.PropsWithChildren<unknown>>;
  exact?: boolean;
}

export type TRouteNames = ELoginRoutes | EProfileRoutes | EAboutAppRoutes;

export type TRoutesMap<S> = Array<IRoute<S>>;
