import { FC, useState } from 'react';

import { Panel, Title, Input, Button } from '../../shared/components';
import { CenteredPage } from '../../layouts';
import { EButtonVariant } from '../../shared/components/Button';

const LoginPage: FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    console.log('attempt to login');
  };

  return (
    <CenteredPage>
      <Panel>
        <Title>Авторизация</Title>
        <form onSubmit={handleLogin}>
          <Input value={login} onChange={setLogin} label={'Логин'} />
          <Input
            label={'Пароль'}
            type={'password'}
            value={password}
            onChange={setPassword}
          />
          <Button type="submit" variant={EButtonVariant.FILLED}>
            Войти
          </Button>
        </form>
      </Panel>
    </CenteredPage>
  );
};

export { LoginPage };
