import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      animate={{ width: collapsed ? 80 : 260 }}
      className="h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 hidden md:flex flex-col shadow-xl backdrop-blur-xl"
    >
      {/* 🔝 Top */}
      <div className="flex justify-between items-center mb-8">
        {!collapsed && (
          <h1 className="text-xl font-bold tracking-wide">🚀 NASA</h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white"
        >
          {collapsed ? "➤" : "◀"}
        </button>
      </div>

      {/* 🧭 Nav */}
      <nav className="space-y-3 flex-1">

        <NavItem to="/" label="Dashboard" icon="📊" collapsed={collapsed} />
        <NavItem to="/mars" label="Mars" icon="🚗" collapsed={collapsed} />
        <NavItem to="/epic" label="EPIC" icon="🌍" collapsed={collapsed} />
        <NavItem to="/neo" label="Asteroids" icon="☄️" collapsed={collapsed} />
        <NavItem to="/search" label="Search" icon="🔍" collapsed={collapsed} />

      </nav>

      {/* ⚡ Footer */}
      {!collapsed && (
        <div className="text-xs text-gray-500 mt-6">
          NASA Dashboard v1.0
        </div>
      )}
    </motion.div>
  );
}

function NavItem({ to, label, icon, collapsed }) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`flex items-center gap-3 p-3 rounded-xl transition relative
            ${
              isActive
                ? "bg-blue-500/20 text-blue-400"
                : "text-gray-400 hover:bg-gray-800"
            }
          `}
        >
          {/* 🔵 Active indicator */}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r"
            />
          )}

          <span className="text-lg">{icon}</span>

          {!collapsed && <span>{label}</span>}
        </motion.div>
      )}
    </NavLink>
  );
}