import { FC, PropsWithChildren, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';
import { useDispatch } from 'react-redux';

import { Avatar, Button, Container } from '../shared/components';
import { ANALYZES, MED_CARD_ROUTS } from '../shared/routes';
import { ANALYZE_MODAL_TYPE } from '../entities/analyze';
import { useModalController } from '../shared/modal-controller';
import { setUserAuth } from '../entities/auth/model/reducer';
import { setUser } from '../entities/user/model/reducer';
import { USER_DATA_LS_KEY, useUser } from '../entities/user';
import localStorageManager from '../shared/localStorage/localStorageManager';
import { REFRESH_TOKEN_LS_KEY } from '../entities/auth';

import { Header, LayoutContainer } from './components';

const TitleNav = styled.nav<SpaceProps>`
  display: flex;
  gap: 30px;
  font-weight: 600;
  text-transform: uppercase;

  ${space}
`;

const UserLayout: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();

  const user = useUser();

  const { onModalOpen } = useModalController();

  const handleLogOut = useCallback(() => {
    dispatch(setUserAuth(false));
    dispatch(setUser(null));
    localStorageManager.removeValue(REFRESH_TOKEN_LS_KEY);
    localStorageManager.removeValue(USER_DATA_LS_KEY);
  }, [dispatch]);

  return (
    <LayoutContainer>
      <Header>
        <TitleNav ml="20px">
          <Link to={MED_CARD_ROUTS.MAIN}>мед карта</Link>
          <Link to={ANALYZES.MAIN}>анализы</Link>
        </TitleNav>
        <Button
          size="s"
          ml="20px"
          onClick={() => onModalOpen(ANALYZE_MODAL_TYPE)}
        >
          + Добавить анализ
        </Button>
        <Container
          as="button"
          alignItems="center"
          gap={10}
          ml="auto"
          onClick={handleLogOut}
        >
          {user!.email}
          <Avatar />
        </Container>
      </Header>
      {children}
    </LayoutContainer>
  );
};

export { UserLayout };
