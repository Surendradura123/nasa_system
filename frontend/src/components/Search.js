import { useState } from "react";
import { searchImages } from "../services/api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const data = await searchImages(query);
    setResults(data.collection.items || []);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-xl">

      <h2 className="text-xl font-bold mb-4">🔍 NASA Library</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 p-2 bg-gray-800 rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 px-4 rounded"
        >
          Search
        </button>
      </div>

      <p className="text-gray-400 mb-4">
        {results.length} results found
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {results.slice(0, 6).map((item, i) => {
          const img = item.links?.[0]?.href;

          return (
            <img
              key={i}
              src={img}
              alt="nasa"
              className="rounded-xl h-52 object-cover"
            />
          );
        })}
      </div>

    </div>
  );
}