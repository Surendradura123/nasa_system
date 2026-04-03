import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar({ isOpen, setIsOpen }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
        <motion.div
          initial={false}
          animate={{ width: collapsed ? 80 : 260 }}
          className={`
            fixed top-0 left-0 h-full bg-gray-900 text-white z-50 p-4 flex flex-col
            transform transition-transform duration-300
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 md:relative
          `}
        >
        {/* Top */}
        <div className="flex justify-between items-center mb-8">
          {!collapsed && <h1 className="text-xl font-bold">🚀 NASA</h1>}

          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "➤" : "◀"}
          </button>
        </div>

        {/* Nav */}
        <nav className="space-y-3 flex-1">
          <NavItem to="/" label="Dashboard" icon="📊" close={() => setIsOpen(false)} />
          <NavItem to="/mars" label="Mars" icon="🚗" close={() => setIsOpen(false)} />
          <NavItem to="/epic" label="EPIC" icon="🌍" close={() => setIsOpen(false)} />
          <NavItem to="/neo" label="Asteroids" icon="☄️" close={() => setIsOpen(false)} />
          <NavItem to="/search" label="Search" icon="🔍" close={() => setIsOpen(false)} />
        </nav>
      </motion.div>
    </>
  );
}

function NavItem({ to, label, icon, close }) {
  return (
    <NavLink to={to} onClick={close}>
      {({ isActive }) => (
        <div
          className={`flex items-center gap-3 p-3 rounded-xl ${
            isActive
              ? "bg-blue-500 text-white"
              : "text-gray-400 hover:bg-gray-800"
          }`}
        >
          <span>{icon}</span>
          <span>{label}</span>
        </div>
      )}
    </NavLink>
  );
}