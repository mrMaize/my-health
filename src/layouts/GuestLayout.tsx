import { FC, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

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
  return (
    <LayoutContainer>
      <HeaderContainer>
        <UnionContainer>
          <StyledLogo>My health</StyledLogo>
        </UnionContainer>
        <UnionContainer>
          <Button variant={EButtonVariant.OUTLINE}>Регистрация</Button>
          <Button>Авторизоваться</Button>
          <Avatar />
        </UnionContainer>
      </HeaderContainer>
      {children}
    </LayoutContainer>
  );
};

export { GuestLayout };
