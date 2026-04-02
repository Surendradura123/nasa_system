import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Apod from "./components/Apod";
import Mars from "./components/Mars";
import NeoChart from "./components/NeoChart";
import Epic from "./components/Epic";
import Search from "./components/Search";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-950 text-white min-h-screen">

      {/* Navbar */}
      <Navbar toggleSidebar={() => setIsOpen(true)} />

      <div className="flex">

        {/* ✅ Desktop Sidebar ONLY */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* ✅ Mobile Sidebar (toggle works here) */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex">

            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar panel */}
            <div className="relative">
              <Sidebar close={() => setIsOpen(false)} />
            </div>
          </div>
        )}

        {/* Main */}
        <main className="flex-1 p-6 space-y-10">

          <section id="apod"><Apod /></section>
          <section id="mars"><Mars /></section>
          <section id="neo"><NeoChart /></section>
          <section id="epic"><Epic /></section>
          <section id="search"><Search /></section>

        </main>
      </div>
    </div>
  );
}