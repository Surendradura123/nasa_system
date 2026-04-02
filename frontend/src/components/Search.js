import { useState } from "react";
import { searchImages } from "../api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const data = await searchImages(query);
      setResults(data.collection.items || []);
    } catch (err) {
      console.error("Search failed");
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-xl">

      {/* 🔍 Title */}
      <h2 className="text-2xl font-bold mb-6">
        🔍 NASA Image Library
      </h2>

      {/* 🔎 Search Bar */}
      <div className="flex gap-3 mb-6">
        <input
          className="flex-1 p-3 rounded-lg bg-gray-800 outline-none"
          placeholder="Search space (e.g. Mars, Moon, Galaxy...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 px-5 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* ⏳ Loading */}
      {loading && <p className="text-gray-400">Searching...</p>}

      {/* 🖼 Results Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

        {results.slice(0, 9).map((item, index) => {
          const image = item.links?.[0]?.href;
          const title = item.data?.[0]?.title;

          if (!image) return null;

          return (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden group shadow-lg"
            >
              {/* Image */}
              <img
                src={image}
                alt="nasa"
                className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-end">
                <p className="text-white text-sm p-3">
                  {title}
                </p>
              </div>
            </div>
          );
        })}

      </div>

      {/* ❌ No results */}
      {!loading && results.length === 0 && (
        <p className="text-gray-500 mt-4">
          No results found. Try searching "Mars" 🚀
        </p>
      )}
    </div>
  );
}