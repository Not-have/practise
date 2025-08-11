import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/hone';
import React03 from './pages/react-03';
import Vue02 from './pages/vue-02';
import './App.css';

function App() {
  return (
    <Router>
      <div className="content">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/react-03" element={<React03 />} />
            <Route path="/vue-02" element={<Vue02 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
