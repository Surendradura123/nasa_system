import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getEpic } from "../services/api";

export default function Epic() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEpic();
  }, []);

  const fetchEpic = async () => {
    try {
      const data = await getEpic();
      setImages(data || []);
    } catch (err) {
      console.error("EPIC error:", err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 LOADING STATE
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        Loading EPIC images...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* 🔥 TITLE */}
      <h1 className="text-2xl font-bold">🌍 Earth from Space (EPIC)</h1>

      {/* ❌ NO DATA */}
      {images.length === 0 && (
        <div className="text-center text-gray-400">
          No EPIC data available from NASA
        </div>
      )}

      {/* ✅ GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {images.map((img, index) => {
          // 🛡 SAFE DATE PARSING
          let dateParts = ["unknown", "unknown", "unknown"];
          let time = "unknown";

          if (img.date) {
            const [dateStr, timeStr] = img.date.split(" ");
            if (dateStr) dateParts = dateStr.split("-");
            if (timeStr) time = timeStr;
          }

          const [year, month, day] = dateParts;

          const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/${img.image}.jpg`;

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/20 transition"
            >
              {/* 🌍 IMAGE */}
              <img
                src={imageUrl}
                alt="Earth"
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />

              {/* 📊 INFO */}
              <div className="p-4 space-y-1">
                <p className="text-sm text-gray-400">
                  📅 {year}-{month}-{day}
                </p>

                <p className="text-sm text-gray-400">
                  ⏰ {time}
                </p>

                <p className="text-xs text-indigo-400 mt-2">
                  Latest available NASA data
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}