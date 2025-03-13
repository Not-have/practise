import React from "react";

import {
  TestMemo,
  TestUse
} from "./components";

export default function DemoHooks() : React.ReactElement {

  return <>
    <a
      href="https://zh-hans.react.dev/reference/react/apis"
      target="_blank">
      API
    </a>

    <TestMemo />
    <TestUse />
  </>;
}
