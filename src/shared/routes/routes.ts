import { aboutAppRoutes } from './aboutApp';
import { ELoginRoutes, TRouteNames, TRoutesMap } from './interfaces/interfaces';
import { loginRoutes } from './loginRoutes';
import { profileRoutes } from './profileRoutes';

export const routesMap: TRoutesMap<TRouteNames> = [
  ...loginRoutes,
  ...profileRoutes,
  ...aboutAppRoutes,
];

export const PUBLIC_ROUTES = [
  ELoginRoutes.LOGIN_PAGE,
  ELoginRoutes.REGISTER_PAGE,
];
