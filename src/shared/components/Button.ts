import styled, { css, StyleFunction } from 'styled-components';
import { SpaceProps, space, width, WidthProps } from 'styled-system';

export enum EButtonVariant {
  FILLED = 'filled',
  OUTLINE = 'outline',
}

interface IButtonProps {
  variant?: EButtonVariant;
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

const Button = styled.button<IButtonProps & SpaceProps & WidthProps>(
  ({ theme: { fontSize, borderRadius } }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: 40px;
    padding: 10px 20px;
    font-size: ${fontSize.l};
    font-weight: 600;
    cursor: pointer;
    border-radius: ${borderRadius.m};
    transition:
      background 100ms ease-in-out,
      border-color 100ms ease-in-out,
      color 100ms ease-in-out;

    ${variantFn};
    ${space};
    ${width};
  `
);

export { Button };
