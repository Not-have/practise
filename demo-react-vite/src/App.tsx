/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-no-bind */
import {
  Routes,
  Route,
  NavLink
} from "react-router";

import styled from "styled-components";

import Demo01 from "./pages/demo-01";
import Demo02 from "./pages/demo-02";
import DemoApi from "./pages/demo-api";
import DemoCustomHooks from "./pages/demo-custom-hooks";
import DemoDevice from "./pages/demo-device";
import DemoHooks from "./pages/demo-hooks";
import DemoIframeMessage from "./pages/demo-iframe-message";
import DemoLazy from "./pages/demo-lazy";

const ScNAv = styled.nav`
  border-bottom: 1px solid #ccc;
`;

function App(): React.ReactElement {
  return <>
    <ScNAv>
      <NavLink
        to="/">
        Demo01
      </NavLink>

      <NavLink
        className={({
          isActive
        }) => isActive ? "active" : ""}
        to="/demo02">
        Demo02
      </NavLink>

      <NavLink
        className={({
          isActive
        }) => isActive ? "active" : ""}
        to="/demo-lazy">
        DemoLazy
      </NavLink>

      <NavLink
        className={({
          isActive
        }) => isActive ? "active" : ""}
        to="/demo-custom-hooks">
        DemoCustomHooks
      </NavLink>

      <NavLink
        className={({
          isActive
        }) => isActive ? "active" : ""}
        to="/demo-hooks">
        DemoHooks
      </NavLink>

      <NavLink
        className={({
          isActive
        }) => isActive ? "active" : ""}
        to="/demo-api">
        DemoApi
      </NavLink>

      <NavLink
        className={({
          isActive
        }) => isActive ? "active" : ""}
        to="/demo-iframe-message">
        DemoIframeMessage
      </NavLink>

      <NavLink
        className={({
          isActive
        }) => isActive ? "active" : ""}
        to="/demo-device">
        DemoDevice
      </NavLink>
    </ScNAv>

    <Routes>
      <Route
        element={<Demo01 />}
        index />

      <Route
        element={<Demo02 />}
        path="demo02" />

      <Route
        element={<DemoLazy />}
        path="demo-lazy" />

      <Route
        element={<DemoCustomHooks />}
        path="demo-custom-hooks" />

      <Route
        element={<DemoHooks />}
        path="demo-hooks" />

      <Route
        element={<DemoApi />}
        path="demo-api" />

      <Route
        element={<DemoIframeMessage />}
        path="demo-iframe-message" />

      <Route
        element={<DemoDevice />}
        path="demo-device" />
    </Routes>
  </>;
}

export default App;
