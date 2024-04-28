import styled, { css } from 'styled-components';

const Avatar = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${colors.background.main};
  `
);

export { Avatar };
