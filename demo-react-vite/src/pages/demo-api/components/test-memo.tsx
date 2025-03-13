/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-multi-comp */
import {
  ScLineText
} from "@/rc";
import React, {
  useState,
  ChangeEvent
} from "react";

function Greeting({
  name
}: any): React.ReactElement{

  console.log("渲染 Greeting");

  return <div>
    {name}
  </div>;
}

const MemoGreeting = React.memo(Greeting);

export default function TestMemo(): React.ReactElement {
  const [name, setName] = useState("");

  const [address, setAddress] = useState("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const {
      value
    } = e.target;

    setName(value);
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const {
      value
    } = e.target;

    setAddress(value);
  };

  return (
    <>
      <ScLineText>React.memo</ScLineText>

      <dl>
        <dt>注意</dt>
        <dd>memo 允许你的组件在 props 没有改变的情况下跳过重新渲染。</dd>
        <dd>即使一个组件被记忆化了，当它自身的状态发生变化时，它仍然会重新渲染</dd>
        <dd>即使组件已被记忆化，当其使用的 context 发生变化时，它仍将重新渲染。记忆化只与从父组件传递给组件的 props 有关</dd>

        <dd>
          当你使用 memo 时，只要任何一个 prop 与先前的值不是 浅层相等 的话，你的组件就会重新渲染。这意味着 React 会使用 Object.is 比较组件中的每个 prop 与其先前的值。注意，Object.is(3, 3) 为 true，但 Object.is(
          {}
          ,
          {}
          ) 为 false
        </dd>

        <dt>不使用 memo</dt>

        <dd>
          <label>
            Name
            {": "}

            <input onChange={handleNameChange}
              value={name} />
          </label>

          <label>
            Address
            {": "}

            <input onChange={handleAddressChange}
              value={address} />
          </label>

          <Greeting name={name} />
        </dd>

        <dd>只要父改改变了，子就渲染</dd>
        <dt>使用 memo</dt>

        <dd>
          <label>
            Name
            {": "}

            <input onChange={handleNameChange}
              value={name} />
          </label>

          <label>
            Address
            {": "}

            <input onChange={handleAddressChange}
              value={address} />
          </label>

          <MemoGreeting name={name} />
        </dd>

        <dd>只有 name 改变了，子才渲染</dd>
      </dl>

    </>
  );
}
