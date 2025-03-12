import {
  useCallback,
  useRef
} from "react";

// 定义泛型 T 表示回调函数的返回值类型，P 表示回调函数的参数类型数组
const useThrottle = <T, P extends unknown[]>(callback: (...args: P) => T, delay = 250) => {

  // 使用 useRef 来存储定时器
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const throttledCallback = useCallback((...args: P) => {

    // 如果定时器存在，说明还在节流时间内，直接返回
    if (timerRef.current) {
      return;
    }

    // 设置定时器
    timerRef.current = setTimeout(() => {

      // 执行传入的回调函数并传入参数
      callback(...args);

      // 清除定时器
      clearTimeout(timerRef.current);

      // 将定时器引用置为 undefined，表示节流时间已过
      timerRef.current = undefined;
    }, delay);
  }, [callback, delay]);

  return throttledCallback;
};

export default useThrottle;
