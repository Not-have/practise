import React from "react";

import {
  ConfigProvider
} from "antd";
import zhCN from "antd/locale/zh_CN";

import TextConverter from "./TextConverter";

function App(): React.ReactElement {
  return (
    <ConfigProvider locale={zhCN}>
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5"
      }}>
        <TextConverter />
      </div>
    </ConfigProvider>
  );
}

export default App;
