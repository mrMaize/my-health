import React, { useRef, useState } from 'react';
import { ClassComponent, FunctionComponent, ClockClass, ClockFunc } from './experimental/class-and-funct';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const clockRef = useRef<HTMLDivElement>(null);

    const handleUpdateCount = () => {
        setCount(prevCount => prevCount + 1);
    }

  return (
    <div className="App">
      <header className="App-header">
         Count: {count}
         <button onClick={handleUpdateCount}>+ 1</button>
        <ClassComponent />
        <FunctionComponent />
        <ClockClass />
        <ClockFunc ref={clockRef} />
      </header>
    </div>
  );
}

export default App;
