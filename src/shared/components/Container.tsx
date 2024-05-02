import styled from 'styled-components';
import { FlexboxProps, flexbox, space, SpaceProps } from 'styled-system';
import { gapFunc, IGapFunc } from './utils/gapFunc';

const Container = styled.div<SpaceProps & FlexboxProps & IGapFunc>`
  display: flex;

  ${space};
  ${flexbox};
  ${gapFunc};
`;

export { Container };
