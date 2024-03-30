import {FC} from "react";
import {Page, Form, Title, Input, Button} from '../../components/index';

const LoginPage: FC = () => {
    return (
        <Page>
            <Form>
                <Title>Авторизация</Title>
                <Input label={'Логин'} />
                <Input label={'Пароль'} type={'password'} />
                <Button>Войти</Button>
            </Form>
        </Page>
    )
}

export default LoginPage;