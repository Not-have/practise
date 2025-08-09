import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import One from './pages/One';
import Two from './pages/Two';
import './App.css';

function App() {
  return (
    <Router>
      <div className="content">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/one" element={<One />} />
            <Route path="/two" element={<Two />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
