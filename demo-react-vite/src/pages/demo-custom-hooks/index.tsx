import {
  useThrottle,
  useCountDown
} from "@/hooks";
import {
  ScLineText
} from "@/rc";
import {
  useState
} from "react";

export default function DemoCustomHooks(): React.ReactElement {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleThrottleClick = useThrottle(increment, 100);

  const {
    currentTime,
    start: handleStart,
    pause: handlePause,
    resume: handleResume,
    reset: handleReset
  } = useCountDown({
    initialTime: 60,
    onEnd: () => console.error("倒计时结束!")
  });

  return <>
    我是自定义 hooks
    <br />
    <ScLineText children="useThrottle 节流" />

    <p>
      Count:
      {count}
    </p>

    <button onClick={handleThrottleClick}>Increment</button>
    <ScLineText children="useCountDown" />

    <div>
      剩余时间:
      {currentTime}
      秒
    </div>

    <button onClick={() => handleStart()}>开始</button>
    <button onClick={handlePause}>暂停</button>
    <button onClick={handleResume}>继续</button>
    <button onClick={handleReset}>重置</button>

  </>;
}
