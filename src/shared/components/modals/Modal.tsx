import { FC, PropsWithChildren } from 'react';
import styled, { css, StyleFunction } from 'styled-components';

import { Container } from '../Container';
import { Button, EButtonVariant } from '../Button';

type SizeType = 's' | 'm' | 'l';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
`;

const HeaderContainer = styled.div(
  ({ theme: { fontSize, colors } }) => css`
    display: flex;
    font-weight: 600;
    font-size: ${fontSize.l};
  `
);

interface IModalProps {
  size?: SizeType;
}

const sizeFn: StyleFunction<IModalProps> = ({
  theme: { borderRadius },
  size,
}) => {
  if (size === 's') {
    return css`
      width: 300px;
      padding: 5px;
      min-height: 200px;
      border-radius: ${borderRadius.xs};
    `;
  }

  return css`
    width: 400px;
    padding: 10px;
    min-height: 200px;
    border-radius: ${borderRadius.m};
  `;
};

const ModalContainer = styled.section<IModalProps>(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    background: ${colors.white};

    ${sizeFn};
  `
);

interface IModal {
  title?: string;
  size?: SizeType;
  onSubmit?: VoidFunction;
  onClose: VoidFunction;
}

const Modal: FC<IModal & PropsWithChildren> = ({
  title,
  size,
  children,
  onClose,
}) => {
  return (
    <Overlay>
      <ModalContainer size={size}>
        <Container justifyContent="space-between" alignItems="center" mb="10px">
          <HeaderContainer>{title}</HeaderContainer>
          <Button
            size="square"
            variant={EButtonVariant.OUTLINE}
            onClick={onClose}
          >
            x
          </Button>
        </Container>
        {children}
      </ModalContainer>
    </Overlay>
  );
};

export { Modal };
