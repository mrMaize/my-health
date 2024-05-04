import { FC, PropsWithChildren, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

import {
  Avatar,
  Button,
  Container,
  ContextMenu,
  ContextMenuItem,
  Dropdown,
} from '../shared/components';
import { Header, LayoutContainer } from './components';
import { Gender, IUser } from '../shared/types/user';
import { ANALYZES, MED_CARD_ROUTS } from '../shared/routes';
import { useAuth } from '../entities/auth';
import { ANALYZE_MODAL_TYPE, AnalyzeModal } from '../entities/analyze';
import { useModalController } from '../shared/modal-controller';

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
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [isOpenContextMenu, setOpenContextMenu] = useState(false);

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
          ref={anchorRef}
          as="button"
          alignItems="center"
          gap={10}
          ml="auto"
          onClick={() => setOpenContextMenu(true)}
        >
          {user!.name ?? user!.email}
          <Avatar />
        </Container>
        <ContextMenu
          isOpen={isOpenContextMenu}
          anchorEl={anchorRef.current}
          setOpen={setOpenContextMenu}
        >
          <ContextMenuItem label="Профиль" as={Link} to={'/dddd'} />
          <ContextMenuItem label="Выйти" onClick={() => setAuth(false)} />
        </ContextMenu>
      </Header>
      {children}
    </LayoutContainer>
  );
};

export { UserLayout };
