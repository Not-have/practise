/* eslint-disable react/no-multi-comp */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
  ScLineText
} from "@/rc";
import {
  createContext,
  use
} from "react";

const ThemeContext = createContext(null);

function Container({
  children
}) {
  const theme = use(ThemeContext);

  return <div>
    {theme}
    {children}
  </div>
  ;
}

export default function TestUse() {
  return <>
    <ScLineText>React.memo</ScLineText>

    <dl>
      <dt>React.use 获取 createContext 中值</dt>

      <dd>
        <ThemeContext.Provider value="dark">
          <Container />
        </ThemeContext.Provider>
      </dd>
    </dl>

  </>;
}
