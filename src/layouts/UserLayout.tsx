import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

import { Avatar, Button, Container } from '../shared/components';
import { Gender, IUser } from '../shared/types/user';
import { ANALYZES, MED_CARD_ROUTS } from '../shared/routes';
import { useAuth } from '../entities/auth';
import { ANALYZE_MODAL_TYPE } from '../entities/analyze';
import { useModalController } from '../shared/modal-controller';

import { Header, LayoutContainer } from './components';

const MOCK_USER_DATA: IUser = {
  email: 'user@gmail.com',
  gender: Gender.male,
  name: 'Иллион Александрович',
};

const TitleNav = styled.nav<SpaceProps>`
  display: flex;
  gap: 30px;
  font-weight: 600;
  text-transform: uppercase;

  ${space}
`;

const UserLayout: FC<PropsWithChildren> = ({ children }) => {
  const user = MOCK_USER_DATA;

  const { setAuth } = useAuth();

  const { onModalOpen } = useModalController();

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
          +Добавить анализ
        </Button>
        <Container
          as="button"
          alignItems="center"
          gap={10}
          ml="auto"
          onClick={() => setAuth(false)}
        >
          {user!.name ?? user!.email}
          <Avatar />
        </Container>
      </Header>
      {children}
    </LayoutContainer>
  );
};

export { UserLayout };
