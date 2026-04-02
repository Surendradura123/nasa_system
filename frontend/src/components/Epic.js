import { useEffect, useState } from "react";
import { getEpic } from "../services/api";

export default function Epic() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  // 🧠 cache
  const cache = {};

  const fetchData = async (selectedDate) => {
    setLoading(true);

    // ⚡ use cache
    if (cache[selectedDate]) {
      setData(cache[selectedDate]);
      setLoading(false);
      return;
    }

    try {
      const res = await getEpic(selectedDate);

      cache[selectedDate] = res; // save
      setData(res);
    } catch {
      setData([]);
    }

    setLoading(false);
  };

  // load latest on mount
  useEffect(() => {
    fetchData();
  }, []);

  // safe render
  const renderImages = () => {
    if (!data.length) {
      return <p className="text-gray-400">No data found</p>;
    }

    return data.slice(0, 6).map((img, i) => {
      if (!img?.date || !img?.image) return null;

      const d = img.date.split(" ")[0].replace(/-/g, "/");

      const url = `https://epic.gsfc.nasa.gov/archive/natural/${d}/png/${img.image}.png`;

      return (
        <img
          key={i}
          src={url}
          alt="earth"
          className="rounded-xl hover:scale-105 transition"
        />
      );
    });
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-xl space-y-4">

      <h2 className="text-xl font-bold">🌍 EPIC Explorer</h2>

      {/* 📅 Date Picker */}
      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          fetchData(e.target.value);
        }}
        className="bg-gray-800 p-2 rounded"
      />

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {renderImages()}
        </div>
      )}

    </div>
  );
}