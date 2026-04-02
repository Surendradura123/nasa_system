import { useEffect, useState } from "react";
import { getMars } from "../services/api";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function Mars() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getMars().then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  // 📊 Camera usage
  const cameraMap = {};
  data.photos.forEach((p) => {
    const cam = p.camera?.name || "Unknown";
    cameraMap[cam] = (cameraMap[cam] || 0) + 1;
  });

  const chartData = Object.keys(cameraMap).map((key) => ({
    camera: key,
    count: cameraMap[key]
  }));

  return (
    <div className="space-y-8">

      {/* 📊 Chart */}
      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold mb-4">📷 Camera Distribution</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="camera" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🖼 Images */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.photos.slice(0, 6).map((img) => (
          <img
            key={img.id}
            src={img.img_src}
            alt="mars"
            className="rounded-xl h-52 w-full object-cover"
          />
        ))}
      </div>

    </div>
  );
}