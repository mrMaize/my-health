import { FC } from 'react';

import { Form, Title, Input, Button } from '../../shared/components';

const LoginPage: FC = () => {
  return (
    <Form>
      <Title>Авторизация</Title>
      <Input value="" label={'Логин'} disabled={false} type={''} />
      <Input label={'Пароль'} type={'password'} value={''} disabled={false} />
      <Button>Войти</Button>
    </Form>
  );
};

export { LoginPage };
