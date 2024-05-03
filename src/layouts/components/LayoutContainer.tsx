import styled, { css } from 'styled-components';

const LayoutContainer = styled.div(
  ({ theme: { colors, bgImage } }) => css`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 800px;
    background: ${colors.background.main};
    background-image: url(${bgImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  `
);

export { LayoutContainer };
