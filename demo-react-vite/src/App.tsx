import {
  Routes,
  Route,
  NavLink
} from "react-router";
import styled from "styled-components";

import Demo01 from "./pages/demo-01";
import Demo02 from "./pages/demo-02";

// eslint-disable-next-line @typescript-eslint/naming-convention
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
        }) => (isActive ? "active" : "")}
        to="/demo02">
        Demo02
      </NavLink>
    </ScNAv>

    <Routes>
      <Route
        element={<Demo01 />}
        index />

      <Route
        element={<Demo02 />}
        path="demo02" />
    </Routes>
  </>;
}

export default App;
