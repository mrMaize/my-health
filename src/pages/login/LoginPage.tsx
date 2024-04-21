import { FC } from 'react';

import { Panel, Title, Input, Button } from '../../shared/components';
import { CenteredPage } from '../../layouts';

const LoginPage: FC = () => {
  return (
    <CenteredPage>
      <Panel>
        <Title>Авторизация</Title>
        <form>
          <Input value="" label={'Логин'} disabled={false} type={''} />
          <Input
            label={'Пароль'}
            type={'password'}
            value={''}
            disabled={false}
          />
          <Button type="submit">Войти</Button>
        </form>
      </Panel>
    </CenteredPage>
  );
};

export { LoginPage };
