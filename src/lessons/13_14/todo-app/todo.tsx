import { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { useHighlightRender } from '../useHighlightRender';

import { ToDoByUserId } from './todo-by-user';

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const CubeData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  min-width: 200px;
  min-height: 100px;
  border: 2px solid green;
`;

const UserButton = styled.button<{ $active: boolean }>(
  ({ $active }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    height: 30px;
    width: fit-content;
    padding: 10px;
    background: lightgray;
    cursor: pointer;
    border: none;
    outline: none;
    transition: background-color 100ms ease-in;

    ${$active &&
    css`
      background: #9a9898;
    `}

    &:hover {
      background: gray;
    }
  `
);

interface IUser {
  id: number;
  name: string;
}

const ToDoApp: FC = () => {
  const cubeRef = useHighlightRender();

  const [userId, setUserId] = useState<null | number>(null);

  const [data, setData] = useState<null | IUser[]>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();

    fetch(`https://jsonplaceholder.typicode.com/users`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((data) => {
        if (!controller.signal.aborted) {
          setData(data);
        }
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setError(error);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading || !data) {
    return <CubeData ref={cubeRef}>Loading...</CubeData>;
  }

  if (error) {
    return <CubeData ref={cubeRef}>Error</CubeData>;
  }

  return (
    <Container>
      <CubeData ref={cubeRef}>
        {data.map((user) => (
          <UserButton
            key={user.id}
            $active={user.id === userId}
            onClick={() =>
              setUserId((prevUserId) =>
                prevUserId === user.id ? null : user.id
              )
            }
          >
            {user.name}
          </UserButton>
        ))}
      </CubeData>
      <ToDoByUserId userId={userId} />
    </Container>
  );
};

export { ToDoApp };
