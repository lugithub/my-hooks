import React, { useState, useEffect, useContext } from 'react';
import useInterval from './use-interval';
import ColorContext from './color-context';

export default function Counter() {
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

  const color = useContext(ColorContext);
  return <h1 style={{ color }}>{count}</h1>;
}
