import { useEffect, useState } from "react";
import { getNeo } from "../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function NeoChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNeo()
      .then(res => {
        const neoData = res.near_earth_objects || {};

        // 📊 Transform API data → chart format
        const formatted = Object.keys(neoData).map(date => ({
          date,
          count: neoData[date].length
        }));

        setData(formatted);
        setLoading(false);
      })
      .catch(err => {
        console.error("NEO fetch error:", err);
        setLoading(false);
      });
  }, []);

  // 🔄 Loading skeleton
  if (loading) {
    return (
      <div className="bg-gray-900 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          ☄️ Near Earth Objects
        </h2>

        <div className="h-64 bg-gray-800 animate-pulse rounded-lg" />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4">
        ☄️ Near Earth Objects (Daily Count)
      </h2>

      {/* Empty state */}
      {data.length === 0 ? (
        <p className="text-gray-400">
          No asteroid data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "none"
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#38bdf8"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}