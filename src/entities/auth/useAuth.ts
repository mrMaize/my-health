import { useContext } from 'react';
import { AuthConsumer } from './auth-context';
import { IAuth } from './types';

const useAuth = (): IAuth => {
  const authProps = useContext(AuthConsumer);

  if (!authProps) {
    throw new Error('Провайдер AuthConsumer не подлючен!');
  }

  return authProps;
};

export { useAuth };
