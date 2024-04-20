import styled, {css} from "styled-components";
import {FC} from "react";
import {useHighlightRender} from "../useHighlightRender";
import {useRequest} from "../../../shared/api";

const CubeData = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  min-width: 100px;
  min-height: 100px;
  border: 2px solid green;
`;

const TodoContainer = styled.div<{ $completed: boolean }>(({$completed}) => css`
  display: flex;
  flex-wrap: wrap;
  min-height: 20px;
  padding: 10px;
  border-radius: 15px;
  background: ${$completed ? 'green' : 'gray'};
`)

interface ITodo {
    id: number;
    title: string;
    completed: boolean
}

const fetchTodosByUserId = ({ userId }: any, { signal }: any) => {
  return fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`, {
      signal
  })
  .then(response => response.json());
}

const ToDoByUserId:FC<{ userId: number | null }> = ({ userId }) => {
    const cubeRef = useHighlightRender();

    const { data, error, isLoading } = useRequest<ITodo[]>(userId && fetchTodosByUserId, [{ userId }]);


    if (!userId) {
        return (<CubeData ref={cubeRef}>Пользователь не выбран</CubeData>);
    }

    if (isLoading || !data) {
        return <CubeData ref={cubeRef}>Loading...</CubeData>
    }

    if (error) {
        return <CubeData ref={cubeRef}>Error</CubeData>
    }

    return (
        <CubeData ref={cubeRef}>
            {data.map(({ id, title, completed }) => <TodoContainer key={id} $completed={completed}>{title}</TodoContainer>)}
        </CubeData>)
}

export { ToDoByUserId }
