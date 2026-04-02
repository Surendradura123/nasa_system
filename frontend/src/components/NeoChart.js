import { useEffect, useState } from "react";
import { getNeo } from "../services/api";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function NeoChart() {
  const [data, setData] = useState([]);
  const [showHazardous, setShowHazardous] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getNeo();
      const neo = res.near_earth_objects;

      const chartData = Object.keys(neo).map((date) => {
        const day = neo[date];

        return {
          date,
          count: day.length,
          hazardous: day.filter(
            (n) => n.is_potentially_hazardous_asteroid
          ).length
        };
      });

      setData(chartData);
    };

    fetchData();
  }, []);

  if (!data.length) {
    return <p className="text-gray-400">No chart data</p>;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-2xl space-y-4">

      {/* 🎛 Filter */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">☄️ Asteroid Activity</h2>

        <button
          onClick={() => setShowHazardous(!showHazardous)}
          className="bg-blue-500 px-3 py-1 rounded"
        >
          {showHazardous ? "Show All" : "Only Hazardous"}
        </button>
      </div>

      {/* 📈 Line Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line
            dataKey={showHazardous ? "hazardous" : "count"}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* 📊 Bar Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}