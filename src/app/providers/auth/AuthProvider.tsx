import { FC, PropsWithChildren, useMemo, useState } from 'react';

import { AuthConsumer } from '../../../entities/auth';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuth, setAuth] = useState(false);

  const authMemoValue = useMemo(() => ({ isAuth, setAuth }), [isAuth]);

  return (
    <AuthConsumer.Provider value={authMemoValue}>
      {children}
    </AuthConsumer.Provider>
  );
};

export { AuthProvider };
