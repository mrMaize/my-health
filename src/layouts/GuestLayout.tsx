import { FC, PropsWithChildren, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Avatar, Button } from '../shared/components';
import { EButtonVariant } from '../shared/components/Button';

const LayoutContainer = styled.div(
  ({ theme: { colors, bgImage } }) => css`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 800px;
    background: ${colors.background.main};
    background-image: url(${bgImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  `
);

const HeaderContainer = styled.header(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 10px 30px;
    background: ${colors.white};
    width: 100%;
  `
);

const StyledLogo = styled.h1(
  ({ theme: { fontSize } }) => css`
    font-size: ${fontSize.xl};
    margin: 0;
  `
);

const UnionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

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
      <HeaderContainer>
        <UnionContainer>
          <StyledLogo>My health</StyledLogo>
        </UnionContainer>
        <UnionContainer>
          <Button onClick={handleRegister} variant={EButtonVariant.OUTLINE}>
            Регистрация
          </Button>
          <Button onClick={handleLogin}>Авторизоваться</Button>
          <Avatar />
        </UnionContainer>
      </HeaderContainer>
      {children}
    </LayoutContainer>
  );
};

export { GuestLayout };
