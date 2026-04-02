import { useEffect, useState } from "react";
import { getEpic } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

export default function Epic() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [playing, setPlaying] = useState(false);

  // 🔄 Fetch data
  const fetchData = () => {
    setLoading(true);
    getEpic()
      .then((res) => setData(res || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ▶️ Auto play
  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [playing, data]);

  // ⏳ Loading
  if (loading) {
    return <p className="text-gray-400">🌍 Loading EPIC...</p>;
  }

  // ❌ No data
  if (!data.length) {
    return (
      <div className="bg-gray-900 p-6 rounded-2xl text-center">
        <h2 className="text-xl font-bold mb-2">🌍 EPIC</h2>
        <p className="text-gray-400 mb-4">No data found</p>

        <button
          onClick={fetchData}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  const current = data[index];

  if (!current?.date || !current?.image){
    return <p className="text-gray-400">No EPIC data available.</p>;
  }

  const date = current.date.split(" ")[0].replace(/-/g, "/");

  const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${date}/png/${current.image}.png`;

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-xl space-y-6">

      {/* 🌍 Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">🌍 Earth Timeline</h2>
        <p className="text-gray-400 text-sm">{current.date}</p>
      </div>

      {/* 🎬 Animated Image */}
      <motion.div
        key={imageUrl}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl overflow-hidden cursor-pointer"
        onClick={() => setSelected(imageUrl)}
      >
        <img
          src={imageUrl}
          alt="earth"
          className="w-full h-96 object-cover"
        />
      </motion.div>

      {/* 🎚 Timeline Slider */}
      <input
        type="range"
        min="0"
        max={data.length - 1}
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
        className="w-full"
      />

      {/* 🎮 Controls */}
      <div className="flex justify-between items-center">

        <button
          onClick={() => setIndex((prev) => (prev - 1 + data.length) % data.length)}
          className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
        >
          ⬅ Prev
        </button>

        <button
          onClick={() => setPlaying(!playing)}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>

        <button
          onClick={() => setIndex((prev) => (prev + 1) % data.length)}
          className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
        >
          Next ➡
        </button>

      </div>

      {/* 🖼 Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.img
              src={selected}
              alt="zoom"
              className="max-w-4xl rounded-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}