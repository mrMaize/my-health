import styled, { css } from 'styled-components';

const Panel = styled.div(
  ({ theme: { borderRadius, colors } }) => css`
    display: flex;
    flex-direction: column;
    padding: 40px 40px;
    border-radius: ${borderRadius.m};
    background: ${colors.white};
  `
);

export { Panel };
