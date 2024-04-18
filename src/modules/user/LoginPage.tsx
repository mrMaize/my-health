import { FC } from 'react';

import { Page, Form, Title, Input, Button } from '../../components/index';

const LoginPage: FC = () => {
  return (
    <Page>
      <Form>
        <Title>Авторизация</Title>
        <Input value="" label={'Логин'} disabled={false} type={''} />
        <Input label={'Пароль'} type={'password'} value={''} disabled={false} />
        <Button>Войти</Button>
      </Form>
    </Page>
  );
};

export default LoginPage;
