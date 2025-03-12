/* eslint-disable no-console */
import {
  ScLineText
} from "@/rc";
import React, {
  useState
} from "react";
import {
  flushSync
} from "react-dom";

export default function TestUseState() : React.ReactElement {

  // const [count, setCount] = useState(0);
  const [count, setCount] = useState(() => {

    const num = 0;

    // 进行复杂的计算，只有在渲染的时候，执行一次
    return num;
  });

  const handleAsyncState = () => {
    setCount(count + 1);

    // 打印的是旧值，因为 setState 是异步的，所以打印的是旧值
    console.log(count);

  };

  // 都是异步的
  const handleSyncStateClick = () => {

    // setTimeout(() => {
    //   setCount(count + 1);
    //   console.log(count + 1); // 这里打印的是更新后的值
    // }, 0);

    flushSync(() => {
      setCount(count + 1);
      setCount(count + 1);
      setCount(count + 1);
    });
  };

  return <>
    <ScLineText>useState</ScLineText>

    <dl>
      <dt>不可变原则</dt>
      <dd>在更新状态时，应该遵循不可变原则，即不要直接修改状态的值，而是创建一个新的值并更新状态。例如，对于数组或对象状态，应该使用展开运算符或其他方法创建一个新的数组或对象</dd>
      <dt>函数式更新</dt>
      <dd>当新的状态值依赖于之前的状态值时，可以使用函数式更新。函数式更新会将前一个状态值作为参数传递给更新函数</dd>
      <dt>函数形式的初始值</dt>
      <dd>当初始值的计算比较复杂时，可以传入一个函数作为初始值。这个函数只会在组件的初始渲染时被调用一次</dd>

      <dt>
        异步更新：
        {count}
      </dt>

      <dd>
        <button onClick={handleAsyncState}>
          异步更新
        </button>

        <p>在大多数情况下，useState 的更新是异步的，这主要是为了性能优化。React 会将多个状态更新合并为一次渲染，以减少不必要的渲染次数。</p>
      </dd>

      <dt>
        同步更新：
        {count}
      </dt>

      <dd>
        <p>在 React 17 之后，都是异步更新。</p>
        <button onClick={handleSyncStateClick}>同步更新</button>
      </dd>

      <dt>setCount 的异步执行和原因</dt>

      <dd>
        性能优化：
        和类组件中的 setState 一样，useState 的更新函数异步执行也是为了性能考虑。React 基于虚拟 DOM 工作，每次状态更新都会触发虚拟 DOM 的比较和真实 DOM 的更新。若每次调用更新函数都立即更新 DOM，会导致频繁的重排和重绘，影响性能。通过异步执行，React 可以将多个状态更新合并为一次，减少不必要的渲染，提升性能。
        <br />
        <br />
        批量更新：
        React 会把同一事件处理函数中的多个更新函数调用合并成一次更新，避免多次渲染，提高性能。比如在一个点击事件处理函数中多次调用更新函数，React 会统一处理这些更新，只进行一次渲染。
        <br />
        <br />
        保证数据一致性：
        在某些情况下，多个更新函数调用可能存在相互依赖关系。如果更新函数同步执行，可能会导致数据不一致。通过异步执行更新函数，React 能确保在所有更新函数调用完成后，再进行一次统一的渲染，保证数据的一致性。
      </dd>
    </dl>
  </>;
}
