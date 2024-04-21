import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

const CenteredContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const CenteredPage: FC<PropsWithChildren> = ({ children }) => {
  return <CenteredContainer>{children}</CenteredContainer>;
};

export { CenteredPage };
