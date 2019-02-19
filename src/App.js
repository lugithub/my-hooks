import React, { useState, useContext } from 'react';
import AppContext from './app-context';
import MouseTracker from './mouse-tracker';

function App() {
  const [showCounter, setShowCounter] = useState(true);

  const context = useContext(AppContext);

  return (
    <div className="App">
      <MouseTracker showCounter={showCounter} context={AppContext} />
      <button onClick={() => setShowCounter(!showCounter)}>
        toggle showCounter
      </button>
      <button
        onClick={() => {
          context.color = 'green';
        }}
      >
        toggle theme
      </button>
    </div>
  );
}

export default App;
