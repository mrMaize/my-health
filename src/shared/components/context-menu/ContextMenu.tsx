import {
  FC,
  CSSProperties,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from 'react';
import styled, { css } from 'styled-components';
import { Dropdown } from '../dropdown';

const ContextMenuContainer = styled(Dropdown)(
  ({ theme: { colors, boxShadow, borderRadius } }) => css`
    min-width: 150px;
    border: none;
    border-radius: ${borderRadius.xs};
    background: ${colors.primary.main};
    box-shadow: ${boxShadow.s};
    overflow: hidden;
  `
);

interface IContextMenuProps {
  className?: string;
  style?: CSSProperties;
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const ContextMenu: FC<IContextMenuProps & PropsWithChildren> = ({
  isOpen,
  anchorEl,
  children,
  setOpen,
}) => {
  return (
    <ContextMenuContainer isOpen={isOpen} anchorEl={anchorEl} setOpen={setOpen}>
      {children}
    </ContextMenuContainer>
  );
};

export { ContextMenu };
