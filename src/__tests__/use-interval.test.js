import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import useInterval from '../use-interval';

jest.useFakeTimers();

let container;

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

  return <h1>{count}</h1>;
}

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render and update a counter', () => {
  // Test first render and effect
  act(() => {
    ReactDOM.render(<Counter />, container);
  });
  const label = container.querySelector('h1');
  expect(label.textContent).toBe('0');
  expect(document.title).toBe('You clicked 0 times');

  // Test second render and effect
  act(() => {
    jest.runAllTimers();
  });
  expect(label.textContent).toBe('9');
  expect(document.title).toBe('You clicked 9 times');
});
