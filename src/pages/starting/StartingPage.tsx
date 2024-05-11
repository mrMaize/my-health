import { FC } from 'react';

import { useIsAuth } from '../../entities/auth/model/selectors';

const StartingPage: FC = () => {
  const isUserAuth = useIsAuth();

  return <div>{`Пользователь авторизовано: ${isUserAuth ? 'Да' : 'Нет'}`}</div>;
};

export default StartingPage;
