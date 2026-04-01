import { useEffect, useState } from "react";
import { getMars } from "../api";

export default function Mars() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMars()
      .then(data => {
        setPhotos(data.photos || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Mars fetch error:", err);
        setLoading(false);
      });
  }, []);

  // 🔄 Loading state (SaaS-style skeleton)
  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          🚀 Mars Rover Photos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-800 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Section Title */}
      <h2 className="text-2xl font-semibold mb-4">
        🚀 Mars Rover Photos
      </h2>

      {/* ⚠️ Fallback indicator */}
      {photos.length <= 3 && (
        <p className="text-yellow-400 text-sm mb-4">
          Showing sample data (API unavailable)
        </p>
      )}

      {/* 📸 Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map(photo => (
          <div
            key={photo.id}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
          >
            <img
              src={photo.img_src}
              alt="Mars surface"
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}