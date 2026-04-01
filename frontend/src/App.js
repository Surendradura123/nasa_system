import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>

      {/* ✅ PASS FUNCTION HERE */}
      <Navbar toggleSidebar={() => setIsOpen(true)} />

      {/* Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          <Sidebar close={() => setIsOpen(false)} />
        </div>
      )}

    </div>
  );
}