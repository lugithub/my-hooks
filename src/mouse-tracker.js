import React, { useState, useDebugValue } from 'react';
import logo from './logo.svg';

import Counter from './counter';

function useMouse() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useDebugValue(JSON.stringify(mouse));

  return [mouse, setMouse];
}

export default function MouseTracker({ showCounter }) {
  const [mouse, setMouse] = useMouse();

  return (
    <div>
      <h1>Move the mouse around!</h1>
      <div
        style={{ height: '300px' }}
        onMouseMove={event => {
          setMouse({
            ...mouse,
            x: event.clientX,
            y: event.clientY
          });
        }}
      >
        <Cat mouse={mouse} />
      </div>
      {showCounter ? <Counter /> : null}
    </div>
  );
}

function Cat({ mouse }) {
  return (
    <div>
      <img
        src={logo}
        alt="show cat"
        style={{
          position: 'absolute',
          left: mouse.x,
          top: mouse.y,
          width: '30px',
          height: '30px'
        }}
      />
    </div>
  );
}
