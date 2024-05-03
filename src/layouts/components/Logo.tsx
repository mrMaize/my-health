import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { STARTING_PAGE_ROUT } from '../../shared/routes';

const TitleLogo = styled(Link)(
  ({ theme: { colors } }) => css`
    margin: 0;
    font-size: 30px;
    font-weight: 700;
    color: ${colors.primary.dark};
  `
);

const Logo = () => {
  return <TitleLogo to={STARTING_PAGE_ROUT}>My health</TitleLogo>;
};

export { Logo };
