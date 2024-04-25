import { TRoutesMap } from './interfaces';
import { loginRoutes } from './loginRoutes';
import { profileRoutes } from './profileRoutes';

export const routesMap: TRoutesMap = [...loginRoutes, ...profileRoutes];
