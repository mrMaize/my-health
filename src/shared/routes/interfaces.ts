import { ComponentType } from 'react';

interface IRoute {
  name: string;
  path?: string;
  component: ComponentType<React.PropsWithChildren<any>>;
  exact?: boolean;
}

export type TRoutesMap = Array<IRoute>;
