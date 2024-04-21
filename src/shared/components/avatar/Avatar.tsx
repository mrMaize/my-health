import styled, { css } from 'styled-components';

const Avatar = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: ${colors.background.main};
  `
);

export { Avatar };
