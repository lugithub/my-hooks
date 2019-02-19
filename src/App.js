import React, { useState } from 'react';

import MouseTracker from './mouse-tracker';

function App() {
  const [showCounter, setShowCounter] = useState(true);

  return (
    <div className="App">
      <MouseTracker showCounter={showCounter} />
      <button onClick={() => setShowCounter(!showCounter)}>
        toggle showCounter
      </button>
    </div>
  );
}

export default App;
