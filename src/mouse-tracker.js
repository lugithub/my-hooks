import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useDebugValue
} from 'react';
import { interval } from 'rxjs';
import logo from './logo.svg';
import AppContext from './app-context';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    if (delay !== null) {
      const subscription = interval(delay).subscribe(savedCallback.current);

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

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    return () => {
      console.log('cleanup');
    };
  });

  const { color } = useContext(AppContext);
  return <h1 style={{ color }}>{count}</h1>;
}

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
