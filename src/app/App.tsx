import { FC } from 'react';

import CheckUserAuth from './userCheck/CheckUserAuth';
import { Providers } from './providers';

const App: FC = () => {
  return (
    <Providers>
      <CheckUserAuth />
    </Providers>
  );
};

export { App };
