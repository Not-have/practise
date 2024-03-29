import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter
} from 'react-router-dom';
import {
    ConfigProvider
} from 'antd';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <ConfigProvider>
            <App />
        </ConfigProvider>
    </BrowserRouter>
);
