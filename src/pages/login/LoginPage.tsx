import { FC, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { Panel, Title, Input, Button } from '../../shared/components';
import { CenteredPage } from '../../layouts';
import { EButtonVariant } from '../../shared/components/Button';
import { sendRequest } from '../../shared/api/xhr/xhr';
import { ERequestTypes } from '../../shared/api/xhr/requestConfig';

const auth = getAuth();

const LoginPage: FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    console.log('attempt to login...');
    sendRequest(ERequestTypes.GET, {
      url: 'http://localhost:5000/v1/user/login',
    });
  };

  const logIn = () => {
    createUserWithEmailAndPassword(auth, login, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <CenteredPage>
      <Panel>
        <Title>Авторизация</Title>
        <form>
          <Input value={login} onChange={setLogin} label={'Логин'} />
          <Input
            label={'Пароль'}
            type={'password'}
            value={password}
            onChange={setPassword}
          />
        </form>
        <Button type="submit" variant={EButtonVariant.FILLED} onClick={logIn}>
          Войти
        </Button>
      </Panel>
    </CenteredPage>
  );
};

export { LoginPage };
