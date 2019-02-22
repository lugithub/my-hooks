import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useDebugValue
} from 'react';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import logo from './logo.svg';
import AppContext from './app-context';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      function intervalCallback(v) {
        savedCallback.current(v);
      }
      const subscription = interval(delay)
        .pipe(take(10))
        .subscribe(intervalCallback);

      return function() {
        console.log('unsub');
        subscription.unsubscribe();
      };
    }
  }, [delay]);
}

function Counter() {
  let [count, setCount] = useState(0);

  let callback = null;
  if (count % 2 === 0) {
    callback = v => {
      console.log(`even callback, current state:${count}, next state: ${v}`);
      setCount(v);
    };
  } else {
    callback = v => {
      console.log(`odd callback, current state:${count}, next state: ${v}`);
      setCount(v);
    };
  }
  useInterval(callback, 1000);

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
