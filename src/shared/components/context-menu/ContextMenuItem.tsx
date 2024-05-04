import { FC, CSSProperties, ElementType } from 'react';
import styled from 'styled-components';

const ItemContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background: wheat;
  cursor: pointer;
  border: none;
  font-family: inherit;

  &:hover {
    background: grey;
  }
`;

interface IContextMenuItemProps {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  label: string;
  to?: string;
  onClick?: VoidFunction;
}

const ContextMenuItem: FC<IContextMenuItemProps> = ({
  as,
  className,
  style,
  to,
  label,
  onClick,
}) => {
  return (
    <ItemContainer
      as={as}
      className={className}
      style={style}
      to={to}
      onClick={onClick}
    >
      {label}
    </ItemContainer>
  );
};

export { ContextMenuItem };
