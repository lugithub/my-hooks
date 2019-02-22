import { useRef, useEffect } from 'react';
import { take } from 'rxjs/operators';
import { interval } from 'rxjs';

export default function useInterval(callback, delay) {
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
