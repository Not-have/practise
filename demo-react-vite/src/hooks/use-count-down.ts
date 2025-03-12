import {
  useState, useEffect, useRef, useCallback
} from "react";

interface IProps {
  initialTime?: number;      // 初始倒计时时间（秒）
  onEnd?: () => void;        // 倒计时结束回调
}

interface ICallbackReturn {
  currentTime: number;
  start: (newTime?: number) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

export default function useCountDown(options: IProps = {}): ICallbackReturn {
  const {
    initialTime = 60,
    onEnd
  } = options;

  // 剩余时间（秒）
  const [currentTime, setCurrentTime] = useState(initialTime);

  // 定时器引用
  const timerRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  // 是否处于暂停状态
  const isPausedRef = useRef(false);

  /**
   * 清除定时器
  */
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /**
   * 开始倒计时
  */
  const start = useCallback((newTime?: number) => {
    clearTimer();
    isPausedRef.current = false;

    // TODO 允许动态设置新时间
    if (typeof newTime === "number") {
      setCurrentTime(newTime);
    } else {
      setCurrentTime(prev => (prev > 0 ? prev : initialTime));
    }

    timerRef.current = setInterval(() => {
      setCurrentTime(prev => {
        if (prev <= 1) {
          clearTimer();
          onEnd?.();

          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  }, [clearTimer, initialTime, onEnd]);

  /**
   * 暂停倒计时
   */
  const pause = useCallback(() => {
    if (timerRef.current && !isPausedRef.current) {
      clearTimer();
      isPausedRef.current = true;
    }
  }, [clearTimer]);

  /**
   * 恢复倒计时
   */
  const resume = useCallback(() => {
    if (isPausedRef.current && currentTime > 0) {
      start(currentTime);
      isPausedRef.current = false;
    }
  }, [currentTime, start]);

  /**
   * 重置倒计时
   */
  const reset = useCallback(() => {
    clearTimer();
    isPausedRef.current = false;
    setCurrentTime(initialTime);
  }, [clearTimer, initialTime]);

  // TODO 组件卸载时清除定时器（优化，也许离开时，不需要暂停）
  useEffect(() => clearTimer, [clearTimer]);

  return {
    currentTime,  // 当前剩余时间（秒）
    start,        // 开始/重启倒计时
    pause,        // 暂停倒计时
    resume,       // 恢复倒计时
    reset         // 重置倒计时
  };
}
