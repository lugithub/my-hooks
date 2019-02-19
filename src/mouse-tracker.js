import React, { useState, useEffect, useRef } from 'react';
import { interval } from 'rxjs';
import logo from './logo.svg';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick(count) {
      savedCallback.current(count);
    }
    if (delay !== null) {
      const subscription = interval(delay).subscribe(tick);
      return function() {
        console.log('unsub');
        subscription.unsubscribe();
      };
    }
  }, [delay]);
}

function Counter() {
  let [count, setCount] = useState(0);

  useInterval(count => {
    // Your custom logic here
    setCount(count);
  }, 1000);

  return <h1>{count}</h1>;
}

function useMouse(rp) {
  const [mouse, setMouse] = useState({ x: 0, y: 0, id: 0 });

  function handleMouseMove(event) {
    setMouse({
      ...mouse,
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

export default function MouseTracker({ showCounter }) {
  return (
    <div>
      <h1>Move the mouse around!</h1>
      {useMouse(mouse => (
        <Cat mouse={mouse} />
      ))}
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
