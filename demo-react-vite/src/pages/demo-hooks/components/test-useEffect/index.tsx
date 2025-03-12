import {
  ScLineText
} from "@/rc";
import {
  useState,
  useEffect
} from "react";

export default function TestUseEffect() : React.ReactElement {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {

      // setCount(count + 1); // 你想要每秒递增该计数器... 不能这样写，闭包陷阱
      setCount(c => c + 1); // ✅ 传递一个 state 更新器
    }, 1000);

    return () => clearInterval(intervalId);

    // }, [count]); // 🚩 ... 但是指定 `count` 作为依赖项总是重置间隔定时器。
  }, []); // ✅现在 count 不是一个依赖项

  return <>
    <ScLineText>useEffect</ScLineText>

    <dl>
      <dt>执行</dt>

      <dd>
        <p>每次渲染时，都会执行</p>
        <p>第二个参数发生变化时执行</p>
        <p>第二个参数为 [] 时，只在渲染时执行一次</p>
      </dd>

      <dt>
        在 Effect 中根据先前 state 更新 state ：
        {count}
      </dt>

      <dd>
        <p>也就是在 useEffect 定义一个 定时器，没 500 毫秒进行一个 +1，这会导致 Effect 在每次 count 更改时再次执行 cleanup 和 setup。</p>

        <p>
          setup（副作用设置）
          cleanup（副作用清除）
        </p>

        <p>
          setCount(count + 1)：会捕获 useEffect 首次执行时的 count 值，后续更新不会反映 count 的最新状态，可能导致更新结果不符合预期(有可能产生闭包陷阱)。
          <br />
          setCount(c =
          {">"}
          {" "}
          c + 1)：使用函数式更新，每次更新都会基于当前最新的状态值，能确保状态更新的正确性，避免闭包陷阱问题。
        </p>
      </dd>
    </dl>
  </>;
}
