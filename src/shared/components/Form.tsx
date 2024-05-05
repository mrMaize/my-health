import styled, { css } from 'styled-components';
import { flexGrow, FlexGrowProps } from 'styled-system';

import { gapFunc, IGapFunc } from './utils/gapFunc';

const Form = styled.form<IGapFunc & FlexGrowProps>(
  () => css`
    display: flex;
    flex-direction: column;

    ${gapFunc};
    ${flexGrow}
  `
);

export { Form };
