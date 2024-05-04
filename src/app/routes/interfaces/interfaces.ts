import { FC } from 'react';

export interface IRoute {
  name: string;
  path?: string;
  component: FC<any>;
  exact?: boolean;
}

export type TRoutesMap = Array<IRoute>;
