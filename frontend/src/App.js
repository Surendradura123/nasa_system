import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar";
import Apod from "./components/Apod";
import Mars from "./components/Mars";
import Epic from "./components/Epic";
import Neo from "./components/Neo";
import Search from "./components/Search";
import Dashboard from "./pages/Dashboard";
import "rc-slider/assets/index.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <div className="flex bg-gray-950 min-h-screen text-white">
        
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-x-hidden">
          
          {/* Mobile Top Bar */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <h1 className="text-lg font-bold">🚀 NASA Dashboard</h1>

            <button
              className="px-3 py-2 bg-indigo-600 rounded-lg"
              onClick={() => setIsOpen(true)}
            >
              ☰
            </button>
          </div>

          {/* Page Content */}
          <div className="animate-fadeIn">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/apod" element={<Apod />} />
              <Route path="/mars" element={<Mars />} />
              <Route path="/epic" element={<Epic />} />
              <Route path="/neo" element={<Neo />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;