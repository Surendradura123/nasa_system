import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getEpic } from "../services/api";

export default function Epic() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchEpic();
  }, []);

  const fetchEpic = async () => {
    try {
      const data = await getEpic();
      setImages(data || []);
    } catch (err) {
      console.error("EPIC error", err);
      setImages([]);
    }
  };

  return (
    <div className="space-y-6">

      {/* 🔥 TITLE */}
      <h1 className="text-2xl font-bold">🌍 EPIC Earth Images</h1>

      {/* ❌ EMPTY STATE */}
      {images.length === 0 && (
        <div className="text-center text-gray-400">
          No EPIC data available
        </div>
      )}

      {/* ✅ IMAGES */}
      <div className="grid md:grid-cols-3 gap-6">

        {images.map((img, index) => {
          const dateParts = img.date?.split(" ")[0].split("-");
          const time = img.date?.split(" ")[1];

          const imageUrl =
            img.identifier === "fallback"
              ? `https://epic.gsfc.nasa.gov/archive/natural/${dateParts[0]}/${dateParts[1]}/${dateParts[2]}/jpg/${img.image}.jpg`
              : `https://epic.gsfc.nasa.gov/archive/natural/${dateParts[0]}/${dateParts[1]}/${dateParts[2]}/jpg/${img.image}.jpg`;

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={imageUrl}
                alt="Earth"
                className="w-full h-64 object-cover"
              />

              <div className="p-4">
                <p className="text-sm text-gray-400">
                  📅 {dateParts.join("-")}
                </p>
                <p className="text-sm text-gray-400">
                  ⏰ {time}
                </p>

                {img.identifier === "fallback" && (
                  <p className="text-xs text-yellow-400 mt-2">
                    Showing last available data
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}