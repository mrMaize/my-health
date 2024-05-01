import styled, { css, StyleFunction } from 'styled-components';
import { flexGrow, FlexGrowProps } from 'styled-system';

interface IGapFunc {
  gap?: string | number;
}

const gapFunc: StyleFunction<IGapFunc> = ({ gap }) => {
  let currentGap;

  if (typeof gap === 'number' && gap !== 0) {
    currentGap = `${gap}px`;
  } else if (typeof gap === 'string') {
    currentGap = gap;
  }

  return css`
    gap: ${currentGap};
  `;
};

const Form = styled.form<IGapFunc & FlexGrowProps>(
  () => css`
    display: flex;
    flex-direction: column;

    ${gapFunc};
    ${flexGrow}
  `
);

export { Form };
