import { FC, ReactEventHandler, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Panel, Title, Input, Button, Form } from '../../shared/components';
import { CenteredPage } from '../../layouts';
import { EButtonVariant } from '../../shared/components/Button';
import localStorageManager from '../../shared/localStorage/localStorageManager';
import { setUser } from '../../entities/user/model/reducer';
import { setUserAuth } from '../../entities/auth/model/reducer';
import { REFRESH_TOKEN_LS_KEY } from '../../entities/auth';
import { USER_DATA_LS_KEY } from '../../entities/user';
import { routes } from '../../shared/routes';

import { fetchUser, signInEmailAndPassword } from './api/auth.api';

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogIn = useCallback<ReactEventHandler<HTMLFormElement>>(
    async (event) => {
      event.preventDefault();

      try {
        setSubmitting(true);
        const { refreshToken } = await signInEmailAndPassword({
          email: login,
          password,
        });
        const user = await fetchUser({ email: login });

        localStorageManager.setValue(REFRESH_TOKEN_LS_KEY, refreshToken);
        localStorageManager.setValue(USER_DATA_LS_KEY, user);
        dispatch(setUserAuth(true));
        dispatch(setUser(user));

        navigate(location.state?.urlToGoAfter || routes.starting.startingPage, {
          replace: true,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
    [dispatch, location.state?.urlToGoAfter, login, navigate, password]
  );

  const isFormValid = !!login && !!password;

  return (
    <CenteredPage>
      <Panel height={400} width={300}>
        <Title mb="20px">Авторизация</Title>
        <Form onSubmit={handleLogIn} gap={20} flexGrow={1}>
          <Input value={login} onChange={setLogin} label="Логин" />
          <Input
            label="Пароль"
            type="password"
            value={password}
            onChange={setPassword}
          />
          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            variant={EButtonVariant.FILLED}
            mt="auto"
            width="100%"
          >
            Войти
          </Button>
        </Form>
      </Panel>
    </CenteredPage>
  );
};

export default LoginPage;
