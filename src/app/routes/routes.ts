import { aboutAppRoutes } from './aboutApp';
import { TRouteNames, TRoutesMap } from './interfaces/interfaces';
import { loginRoutes } from './loginRoutes';
import { profileRoutes } from './profileRoutes';

export const routesMap: TRoutesMap<TRouteNames> = [
  ...loginRoutes,
  ...profileRoutes,
  ...aboutAppRoutes,
];
