import styled, { css, StyleFunction } from 'styled-components';

const enum ButtonType {
  Filled = 'filled',
  Outline = 'outline',
}

type ButtonVariantType = 'filled' | 'outline';

interface IButtonProps {
  variant?: ButtonVariantType;
}

const variant: StyleFunction<IButtonProps> = ({
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
        color: ${colors.primary.disabled};
        border-color: ${colors.primary.disabled};
        cursor: none;
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
      background: ${colors.primary.disabled};
      cursor: none;
    }
  `;
};

const Button = styled.button<IButtonProps>(
  ({ theme: { fontSize, borderRadius } }) => css`
    display: flex;
    align-items: center;
    height: 40px;
    font-size: ${fontSize.l};
    font-weight: 600;
    padding: 5px 10px;
    cursor: pointer;
    transition:
      background 100ms ease-in-out,
      background-color 100ms ease-in-out;
    border-radius: ${borderRadius.s};

    ${variant};
  `
);

export { Button };
