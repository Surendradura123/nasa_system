import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getMars } from "../services/api";

export default function Mars() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchMars();
  }, []);

  const fetchMars = async () => {
    try {
      const data = await getMars();
      setPhotos(data.photos || []);
    } catch (err) {
      console.error("Mars error:", err);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        Loading Mars photos...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* 🔥 Title */}
      <h1 className="text-2xl font-bold">🚀 Mars Rover Photos</h1>

      {/* ❌ Empty */}
      {photos.length === 0 && (
        <div className="text-center text-gray-400">
          No Mars photos available
        </div>
      )}

      {/* ✅ Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {photos.slice(0, 9).map((photo) => (
          <motion.div
            key={photo.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelected(photo)}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              src={photo.img_src}
              alt="Mars"
              className="w-full h-64 object-cover"
            />

            <div className="p-4">
              <p className="text-sm text-gray-400">
                📅 {photo.earth_date || "Unknown"}
              </p>

              <p className="text-sm text-gray-400">
                🚗 {photo.rover?.name || "Curiosity"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔥 MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="max-w-4xl w-full p-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                className="text-white mb-2"
                onClick={() => setSelected(null)}
              >
                ✕ Close
              </button>

              {/* Image */}
              <motion.img
                src={selected.img_src}
                alt="Mars"
                className="w-full rounded-xl"
                whileHover={{ scale: 1.05 }} // 🔍 zoom effect
              />

              {/* Info */}
              <div className="mt-4 text-gray-300">
                <p>📅 {selected.earth_date}</p>
                <p>🚗 {selected.rover?.name}</p>
                <p>📷 Camera: {selected.camera?.full_name}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}