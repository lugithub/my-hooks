import React, { useState } from 'react';
import logo from './logo.svg';

function useMouse(rp) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  function handleMouseMove(event) {
    setMouse({
      x: event.clientX,
      y: event.clientY
    });
  }
  return (
    <div style={{ height: '300px' }} onMouseMove={handleMouseMove}>
      {rp(mouse)}
    </div>
  );
}

export default function MouseTracker() {
  return (
    <div>
      <h1>Move the mouse around!</h1>
      {useMouse(mouse => (
        <Cat mouse={mouse} />
      ))}
    </div>
  );
}

function Cat({ mouse }) {
  return (
    <img
      src={logo}
      style={{
        position: 'absolute',
        left: mouse.x,
        top: mouse.y,
        width: '30px',
        height: '30px'
      }}
    />
  );
}
