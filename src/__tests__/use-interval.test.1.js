import { testHook, act, cleanup } from 'react-testing-library';
import useInterval from '../use-interval';

jest.useFakeTimers();

afterEach(cleanup);

describe('useInterval', () => {
  test('callback is not called initially', () => {
    const delay = 1000;
    const callback = jest.fn();
    testHook(() => useInterval(callback, delay));

    expect(callback).not.toBeCalled();
  });

  test('callback is called', () => {
    const delay = 1000;
    const callback = jest.fn();
    testHook(() => useInterval(callback, delay));

    act(() => {
      jest.runAllTimers();
    });

    expect(callback).toHaveBeenCalledTimes(10);
    expect(callback).toHaveBeenNthCalledWith(1, 0);
    expect(callback).toHaveBeenNthCalledWith(2, 1);
    expect(callback).toHaveBeenNthCalledWith(10, 9);
  });
});
