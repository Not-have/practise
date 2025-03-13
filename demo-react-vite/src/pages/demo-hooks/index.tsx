import React from "react";

import {
  TestUseEffect,
  TestUseState,
  TestUseLayoutEffect,
  TestUseMemo
} from "./components";

export default function DemoHooks() : React.ReactElement {

  return <>
    <a
      href="https://zh-hans.react.dev/reference/react/hooks"
      target="_blank">
      hooks
    </a>

    <TestUseState />
    <TestUseEffect />
    <TestUseLayoutEffect />
    <TestUseMemo />
  </>;
}
