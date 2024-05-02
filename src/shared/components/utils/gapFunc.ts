import { css, StyleFunction } from 'styled-components';

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

export { gapFunc };
export type { IGapFunc };
