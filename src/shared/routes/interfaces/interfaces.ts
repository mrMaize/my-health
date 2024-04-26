import { ComponentType } from 'react';

interface IRoute<S> {
  name: string;
  path?: S;
  component: ComponentType<React.PropsWithChildren<unknown>>;
  exact?: boolean;
}

export enum ELoginRoutes {
  LOGIN_PAGE = '/login',
  REGISTER_PAGE = '/register',
}

export enum EProfileRoutes {
  PROFILE_PAGE = '/health/profile',
}

export enum EAboutAppRoutes {
  ABOUT_PAGE = 'health/about',
}

export type TRouteNames = ELoginRoutes | EProfileRoutes | EAboutAppRoutes;

export type TRoutesMap<S> = Array<IRoute<S>>;
