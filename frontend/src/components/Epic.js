import { useEffect, useState } from "react";
import { getEpic } from "../api";

export default function Epic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getEpic().then(setData);
  }, []);

  if (!data.length) {
    return <p className="text-gray-400">Loading Earth images...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">🌍 Earth from Space (EPIC)</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.slice(0, 6).map((item, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden group shadow-lg"
          >
            {/* Image */}
            <img
              src={item.image}
              alt="earth"
              className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end">
              
              {/* Caption */}
              <p className="text-white text-sm p-4">
                {item.caption}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}