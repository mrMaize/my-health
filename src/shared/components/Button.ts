import styled, { css, StyleFunction } from 'styled-components';
import { SpaceProps, space, width, WidthProps } from 'styled-system';

export enum EButtonVariant {
  FILLED = 'filled',
  OUTLINE = 'outline',
}

type SizeType = 'xs' | 's' | 'm' | 'l' | 'square';

interface IButtonProps {
  variant?: EButtonVariant;
  size?: SizeType;
}

const variantFn: StyleFunction<IButtonProps> = ({
  theme: { colors },
  variant = 'filled',
}) => {
  if (variant === 'outline') {
    return css`
      background: ${colors.white};
      color: ${colors.primary.main};
      border: 2px solid ${colors.primary.main};

      &:hover {
        color: ${colors.primary.dark};
        border-color: ${colors.primary.dark};
      }

      &:disabled {
        cursor: default;
        color: ${colors.primary.disabled};
        border-color: ${colors.primary.disabled};
      }
    `;
  }

  return css`
    background: ${colors.primary.main};
    color: ${colors.white};

    &:hover {
      background: ${colors.primary.dark};
    }

    &:disabled {
      cursor: default;
      color: ${colors.text.disabled};
      background: ${colors.primary.disabled};
    }
  `;
};

const sizeFn: StyleFunction<IButtonProps> = ({
  size = 'm',
  theme: { fontSize, borderRadius },
}) => {
  if (size === 'square') {
    return css`
      height: 30px;
      width: 30px;
      font-size: ${fontSize.s};
      border-radius: ${borderRadius.xxs};
    `;
  }

  if (size === 's') {
    return css`
      height: 30px;
      padding: 5px 10px;
      font-size: ${fontSize.s};
      border-radius: ${borderRadius.s};
    `;
  }

  return css`
    height: 40px;
    padding: 10px 20px;
    font-size: ${fontSize.l};
    border-radius: ${borderRadius.m};
  `;
};

const Button = styled.button<IButtonProps & SpaceProps & WidthProps>(
  ({ theme: { fontSize, borderRadius } }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    font-weight: 600;
    cursor: pointer;
    transition:
      background 100ms ease-in-out,
      border-color 100ms ease-in-out,
      color 100ms ease-in-out;

    ${variantFn};
    ${space};
    ${width};
    ${sizeFn};
  `
);

export { Button };
