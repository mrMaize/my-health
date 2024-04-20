import {FC, useState} from "react";
import styled, {css} from "styled-components";
import { useHighlightRender } from '../useHighlightRender';
import {ToDoByUserId} from "./todo-by-user";
import {useRequest} from "../../../shared/api";

const Container = styled.div`
  display: flex;
  gap: 10px;
`

const CubeData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  min-width: 200px;
  min-height: 100px;
  border: 2px solid green;
`;

const UserButton = styled.button<{ $active: boolean }>(({ $active }) => css`
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
  
  ${$active && css`
    background: #9a9898;
  `}
  
  &:hover {
    background: gray;
  }
`);

interface IFetchUserProps {
    signal?: AbortSignal;
}

const fetchUsers = ({ signal }: IFetchUserProps) => {
    return fetch(`https://jsonplaceholder.typicode.com/users`, {
        signal
    })
        .then(response => response.json());
}

interface IUser {
    id: number;
    name: string;
}

const ToDoApp:FC = () => {
    const cubeRef = useHighlightRender();

    const [userId, setUserId] = useState<null | number>(null);

    const { data, isLoading, error } = useRequest<IUser[]>(fetchUsers);

    if (isLoading || !data) {
        return <CubeData ref={cubeRef}>Loading...</CubeData>
    }

    if (error) {
        return <CubeData ref={cubeRef}>Error</CubeData>
    }

    return (
        <Container>
        <CubeData ref={cubeRef}>
            {data.map(user => (
                <UserButton
                    key={user.id}
                    $active={user.id === userId}
                    onClick={() => setUserId(prevUserId => prevUserId === user.id ? null : user.id )}
                >
                    {user.name}
                </UserButton>
            ))}
        </CubeData>
          <ToDoByUserId userId={userId}/>
        </Container>
    )
}

export { ToDoApp };
