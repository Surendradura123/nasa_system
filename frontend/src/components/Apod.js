import { useEffect, useState } from "react";
import { getApod } from "../services/api";

export default function Apod() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApod()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error("APOD fetch error:", err);
        setLoading(false);
      });
  }, []);

  // 🔄 Loading skeleton
  if (loading) {
    return (
      <div className="h-80 bg-gray-800 animate-pulse rounded-xl" />
    );
  }

  // ❌ Safety check
  if (!data) {
    return (
      <p className="text-gray-400">
        Failed to load APOD
      </p>
    );
  }

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
      <img
        src={data.url}
        alt={data.title}
        className="w-full h-80 object-cover"
      />

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">
          {data.title}
        </h2>

        <p className="text-gray-400 text-sm line-clamp-4">
          {data.explanation}
        </p>
      </div>
    </div>
  );
}