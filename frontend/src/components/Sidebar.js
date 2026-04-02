import { useEffect, useState } from "react";

export default function Sidebar({ close }) {
  const [active, setActive] = useState("apod");

  useEffect(() => {
    const sections = ["apod", "mars", "neo"];

    const handleScroll = () => {
      let current = "apod";

      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const offset = el.offsetTop - 120;
          if (window.scrollY >= offset) {
            current = id;
          }
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Tailwind classes for active vs inactive
  const base =
    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200";

  const activeStyle =
    "bg-blue-500 text-white shadow-md";

  const inactiveStyle =
    "text-gray-400 hover:bg-gray-800 hover:text-white";

  return (
    <div className="w-64 bg-gray-900 p-6 h-full">
      <h2 className="text-xl font-bold mb-8">Menu</h2>

      <nav className="space-y-2">

        <a
          href="#apod"
          onClick={close}
          className={`${base} ${
            active === "apod" ? activeStyle : inactiveStyle
          }`}
        >
          🌌 APOD
        </a>

        <a
          href="#mars"
          onClick={close}
          className={`${base} ${
            active === "mars" ? activeStyle : inactiveStyle
          }`}
        >
          🚀 Mars
        </a>

        <a
          href="#neo"
          onClick={close}
          className={`${base} ${
            active === "neo" ? activeStyle : inactiveStyle
          }`}
        >
          ☄️ Asteroids
        </a>

        <a
          href="#epic"
          onClick={close}
          className={`${base} ${
            active === "epic" ? activeStyle : inactiveStyle
          }`}
        >
          🌍 EPIC
        </a>

        <a
          href="#search"
          onClick={close}
          className={`${base} ${
            active === "search" ? activeStyle : inactiveStyle
          }`}
        >
          🔍 Search
        </a>

      </nav>
    </div>
  );
}