import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

import ReducerDemo from "./pages/reducer-demo";
import CreateContextDemo from "./pages/create-context-demo";

function App(): JSX.Element {
    return <>
        <nav>
            <Link to="/">useReducer 的使用</Link>
            &nbsp;
            <Link to="/CreateContextDemo">CreateContext 的使用</Link>
        </nav>
        <br/>
        <Routes>
            <Route path="/" element={<ReducerDemo />} />
            <Route path="/CreateContextDemo" element={<CreateContextDemo />} />
        </Routes>
    </>
}

export default App;
