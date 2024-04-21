import styled, { css, StyleFunction } from 'styled-components';

type ButtonVariant = 'filled' | 'outline';

interface IButtonProps {
  variant?: ButtonVariant;
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
        cursor: none;
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
      cursor: none;
      background: ${colors.primary.disabled};
    }
  `;
};

const Button = styled.button<IButtonProps>(
  ({ theme: { fontSize, borderRadius } }) => css`
    display: flex;
    align-items: center;
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
  `
);

export { Button };
