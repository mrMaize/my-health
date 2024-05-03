import { FC, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { Logo } from './Logo';

const HeaderContainer = styled.header(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    height: 60px;
    padding: 10px 30px;
    background: ${colors.white};
    width: 100%;
  `
);

const Header: FC<PropsWithChildren> = ({ children }) => {
  return (
    <HeaderContainer>
      <Logo />
      {children}
    </HeaderContainer>
  );
};

export { Header };
