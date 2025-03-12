import {
  useThrottle,
  useCountDown
} from "@/hooks";
import {
  ScLineText
} from "@/rc";
import {
  ChangeEvent,
  useState
} from "react";

export default function DemoCustomHooks(): React.ReactElement {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (value: string): void => {
    console.warn("执行搜索:", value);
  };

  const throttledSearch = useThrottle(handleSearch, 1000);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const {
      value
    } = e.target;

    setInputValue(value);     // 实时更新输入框显示
    throttledSearch(value);   // 节流后的搜索操作
  };

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
      截流:
      {inputValue}
    </p>

    <input
      onChange={handleInputChange}
      placeholder="输入搜索内容..."
      type="text"
      value={inputValue}/>

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
