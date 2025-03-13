/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable react/no-multi-comp */
import {
  ScLineText
} from "@/rc";
import {
  useMemo
} from "react";

function ExpensiveComponent({
  data
}: any): React.ReactElement {
  console.log("渲染 ExpensiveComponent");

  return <div>
    {data}
    <p> 是一个开销较大的组件。使用 useMemo 缓存这个组件后，只有当 data 发生变化时，才会重新渲染该组件</p>
  </div>;
}

export default function TestUseMemo(): React.ReactElement {

  const data = "这是一些数据";

  // 使用 useMemo 缓存组件
  const memoizedComponent = useMemo(() => <ExpensiveComponent data={data} />, [data]);

  return <>
    <ScLineText children="useMemo" />

    <dl>
      <dt>注意事项</dt>
      <dd>它在每次重新渲染的时候能够缓存计算的结果</dd>
      <dd>useMemo 在多次重新渲染中缓存了 calculation 函数计算的结果直到依赖项的值发生变化</dd>
      <dd>useMemo 重新计算是要等，依赖项，发生改变后，才可以</dd>
      <dt>混存组件</dt>

      <dd>
        {memoizedComponent}
      </dd>

      <dt>useMemo 和 React.memo 缓存组件的区别</dt>
      <dd>useMemo 只有依赖项中的元素发生变化后，才会更新</dd>
      <dd>React.memo 仅对组件的 props 进行浅比较，不会考虑组件内部的状态变化</dd>
      <dt>useMemo 嵌套 useCallback</dt>

      <dd>
        封装复杂逻辑：
        <br />
        当需要在一个较大的计算过程中定义一个回调函数，并且这个回调函数依赖于外部状态时，使用 useMemo 嵌套 useCallback 可以将复杂的逻辑封装在一起。例如，在上面的示例中，handleClick 函数依赖于 count 状态，通过 useCallback 缓存这个函数，确保只有当 count 改变时才会重新创建该函数。而 useMemo 则缓存整个 JSX 结构，只有当 count 或 value 改变时才会重新计算。
      </dd>

      <dd>
        优化性能：
        <br />
        当组件的渲染过程中存在大量的计算和渲染操作时，使用 useMemo 嵌套 useCallback 可以避免不必要的重新计算和渲染。通过将复杂的逻辑封装在回调函数中，只有当需要重新渲染时才会重新执行该函数，从而减少了不必要的计算和渲染开销。
      </dd>

      <dd>
        避免依赖问题
        <br />
        使用 useMemo 嵌套 useCallback 可以避免依赖问题，确保回调函数的依赖项正确更新。由于 useCallback 会缓存函数本身，而不是函数的返回值，因此可以确保回调函数的依赖项正确更新。
      </dd>

    </dl>
  </>;
}
