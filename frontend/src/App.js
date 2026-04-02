import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import SpaceBackground from "./components/SpaceBackground";

import Dashboard from "./pages/Dashboard";
import Mars from "./components/Mars";
import Epic from "./components/Epic";
import NeoChart from "./components/NeoChart";
import Search from "./components/Search";

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mars" element={<Mars />} />
        <Route path="/epic" element={<Epic />} />
        <Route path="/neo" element={<NeoChart />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SpaceBackground />

      <div className="flex relative z-10 min-h-screen text-white">
        <Sidebar />
        <main className="flex-1 p-6">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;