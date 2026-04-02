import { useState } from "react";
import { searchImages } from "../api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const data = await searchImages(query);
    setResults(data.collection.items || []);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🔍 NASA Search</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="p-2 bg-gray-800 rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search space..."
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 px-4 rounded"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {results.slice(0, 6).map((item, i) => (
          <p key={i} className="text-gray-400">
            {item.data[0].title}
          </p>
        ))}
      </div>
    </div>
  );
}