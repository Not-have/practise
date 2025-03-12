import {
  useThrottle
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

  return <>
    我是自定义 hooks
    <br />
    <ScLineText children="useThrottle 节流" />

    <p>
      Count:
      {count}
    </p>

    <button onClick={handleThrottleClick}>Increment</button>
  </>;
}
