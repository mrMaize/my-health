import React, { FC, memo, useCallback, useEffect, useState } from 'react';

import './cube-app.css';
import Button from '../../components/Button';

import { useHighlightRender } from './useHighlightRender';
import { ToDoApp } from './todo-app/todo';

const Cube = memo<{ onAddCube: VoidFunction }>(({ onAddCube }) => {
  const ref = useHighlightRender();

  return (
    <div ref={ref} className="cube">
      <Button style={{ marginTop: 'auto' }} onClick={onAddCube}>
        +1
      </Button>
    </div>
  );
});

export const ExampleFuncComponent: FC = () => {
  const [state, setState] = useState<object>(['1']);

  const ref = useHighlightRender();

  return (
    <div ref={ref} className="cube">
      <div>{state.toString()}</div>
      <button onClick={() => setState(['1'])}>установить {}</button>
    </div>
  );
};

const CubeApp: FC = () => {
  const ref = useHighlightRender();

  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const handleUpdateCount = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div ref={ref} className="three-page">
      <div className="control-panel">
        Count: {count}
        <button onClick={handleUpdateCount}>+ 1</button>
      </div>
      <div className="play-container">
        {new Array(count).fill('').map((_, index) => (
          <Cube key={index} onAddCube={handleUpdateCount} />
        ))}
        <ToDoApp />
      </div>
    </div>
  );
};

export { CubeApp };
