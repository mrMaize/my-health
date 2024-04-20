import styled, { css } from 'styled-components';

const Page = styled.div(
  ({ theme: { colors } }) => css`
    height: 100vh;
    width: 100%;
    display: flex;
    background: ${colors.background.main};
    align-items: center;
    justify-content: center;
  `
);

export default Page;
