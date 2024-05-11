import { FC, ReactEventHandler, useCallback, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Panel, Title, Input, Button, Form } from '../../shared/components';
import { CenteredPage } from '../../layouts';
import { EButtonVariant } from '../../shared/components/Button';
import { STARTING_PAGE_ROUT } from '../../shared/routes';
import localStorageManager from '../../shared/localStorage/localStorageManager';
import { AUTH_REFRESH_TOKEN } from '../../shared/hooks/userAuth/constants';
import { useAuth } from '../../entities/auth';
import { MOCK_USER_DATA } from '../../layouts/UserLayout';
import { setUser } from '../../entities/user/model/reducer';
import { setUserAuth } from '../../entities/auth/model/reducer';

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  const { setAuth } = useAuth();

  const handleLogIn = useCallback<ReactEventHandler<HTMLFormElement>>(
    async (event) => {
      event.preventDefault();

      dispatch(setUserAuth(true));
      dispatch(setUser(MOCK_USER_DATA));

      setAuth(true);

      return;

      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          login,
          password
        );
        const user = userCredential.user;
        const userRefreshToken = user.refreshToken;

        localStorageManager.setValue(AUTH_REFRESH_TOKEN, userRefreshToken);

        navigate(location.state?.urlToGoAfter || STARTING_PAGE_ROUT, {
          replace: true,
        });
      } catch (error) {
        console.log(error);
      }
    },
    []
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
            disabled={!isFormValid}
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
