import React from 'react';
import {
    Routes,
    Route,
    Link
} from 'react-router-dom';

import ReducerDemo from './pages/reducer-demo';
import CreateContextDemo from './pages/create-context-demo';
import ContextReducerDemo from './pages/context-reducer-demo';

function App(): JSX.Element {
    return <>
        <nav>
            <Link to="/">useReducer 的使用</Link>
            &nbsp;
            <Link to="/CreateContextDemo">CreateContext 的使用</Link>
            &nbsp;
            <Link to="/ContextReducerDemo">useReducer 和 useContext 组合封装的使用</Link>
        </nav>
        <br />
        <Routes>
            <Route path="/" element={<ReducerDemo />} />
            <Route path="/CreateContextDemo" element={<CreateContextDemo />} />
            <Route path="/ContextReducerDemo" element={<ContextReducerDemo />} />
        </Routes>
    </>;
}

export default App;
