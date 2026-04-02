import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center shadow">

      <h1 className="font-bold text-lg">🚀 NASA SaaS</h1>

      <div className="space-x-6">
        <NavLink to="/" className="hover:text-blue-400">
          Dashboard
        </NavLink>
      </div>

    </nav>
  );
}