import { FC, PropsWithChildren, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Button, Container } from '../shared/components';
import { EButtonVariant } from '../shared/components/Button';
import { Header, LayoutContainer } from './components';

const GuestLayout: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const handleRegister = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  const handleLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <LayoutContainer>
      <Header>
        <Container alignItems="center" gap={10} ml="auto">
          <Button onClick={handleRegister} variant={EButtonVariant.OUTLINE}>
            Регистрация
          </Button>
          <Button onClick={handleLogin}>Авторизоваться</Button>
          <Avatar />
        </Container>
      </Header>
      {children}
    </LayoutContainer>
  );
};

export { GuestLayout };
