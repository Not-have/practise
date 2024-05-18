import React, {
  useState
} from 'react';
export default function DemoUseState(): JSX.Element {
  const [state, setState] = useState(1)

  const handleClick = () => {
    setState(state => state + 1)
  }
  return <>
    <button onClick={handleClick}>修改</button>
    {state}
  </>;
}