import { FC, useCallback, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { Panel, Title, Input, Button } from '../../shared/components';
import { CenteredPage } from '../../layouts';
import { EButtonVariant } from '../../shared/components/Button';
import localStorageManager from '../../shared/localStorage/localStorageManager';

const RegisteredPage: FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = useCallback(async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        login,
        password
      );
      const user = userCredential.user;
      const userRefreshToken = user.refreshToken;

      localStorageManager.setValue('auth_token', userRefreshToken);

      navigate('/health/profile');
    } catch (error) {
      console.log(error);
    }
  }, [login, password]);

  return (
    <CenteredPage>
      <Panel>
        <Title>Регистрация</Title>
        <form>
          <Input value={login} onChange={setLogin} label={'Логин'} />
          <Input
            label={'Пароль'}
            type={'password'}
            value={password}
            onChange={setPassword}
          />
        </form>
        <Button
          onClick={handleRegister}
          type="submit"
          variant={EButtonVariant.FILLED}
        >
          Войти
        </Button>
      </Panel>
    </CenteredPage>
  );
};

export default RegisteredPage;
