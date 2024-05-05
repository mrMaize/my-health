import { FC, ReactEventHandler, useCallback, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { Panel, Title, Input, Button, Form } from '../../shared/components';
import { CenteredPage } from '../../layouts';
import { EButtonVariant } from '../../shared/components/Button';
import localStorageManager from '../../shared/localStorage/localStorageManager';

const RegisteredPage: FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const navigate = useNavigate();

  const handleRegister = useCallback<ReactEventHandler<HTMLFormElement>>(
    async (event) => {
      event.preventDefault();

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
    },
    [login, navigate, password]
  );

  const isFormValid = !!login && !!password && password === repeatPassword;

  return (
    <CenteredPage>
      <Panel width={350}>
        <Title mb="20px">Регистрация</Title>
        <Form onSubmit={handleRegister} gap={20} flexGrow={1}>
          <Input value={login} onChange={setLogin} label="Логин" />
          <Input
            label="Пароль"
            type="password"
            value={password}
            onChange={setPassword}
          />
          <Input
            label="Повторите пароль"
            type="password"
            value={repeatPassword}
            onChange={setRepeatPassword}
          />
          <Button
            type="submit"
            variant={EButtonVariant.FILLED}
            mt="auto"
            width="100%"
            disabled={!isFormValid}
          >
            Зарегистрироваться
          </Button>
        </Form>
      </Panel>
    </CenteredPage>
  );
};

export default RegisteredPage;
