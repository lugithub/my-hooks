import React, { useState } from 'react';
import ColorContext from './color-context';
import MouseTracker from './mouse-tracker';
import useLocation from './use-location';
import Counter from './counter';

function App() {
  const [showCounter, setShowCounter] = useState(true);
  const [color, setColor] = useState('red');

  const location = useLocation();

  return (
    <div className="App">
      <p>{location}</p>

      <ColorContext.Provider value={color}>
        <MouseTracker showCounter={showCounter} />
      </ColorContext.Provider>
      <Counter />

      <button onClick={() => setShowCounter(!showCounter)}>
        toggle showCounter
      </button>
      <button
        onClick={() => {
          setColor(prev => (prev === 'red' ? 'green' : 'red'));
        }}
      >
        toggle theme
      </button>
    </div>
  );
}

export default App;
