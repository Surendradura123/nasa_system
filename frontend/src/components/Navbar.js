export default function Navbar({ toggleSidebar }) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 text-white border-b border-gray-800">

      {/* ☰ Hamburger */}
      <button
        className="md:hidden text-2xl"
        onClick={() => {
          if (toggleSidebar) toggleSidebar();
        }}
      >
        ☰
      </button>

      <h1 className="text-lg font-bold">🚀 Space SaaS</h1>

      <button className="bg-blue-500 px-3 py-1 rounded-lg">
        Refresh
      </button>
    </div>
  );
}