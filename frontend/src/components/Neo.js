import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { getNeo } from "../services/api";

export default function Neo() {
  const [rawData, setRawData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [dates, setDates] = useState([]);
  const [range, setRange] = useState([0, 5]);
  const [hazardOnly, setHazardOnly] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAsteroids, setSelectedAsteroids] = useState([]);

  const [loading, setLoading] = useState(true);

  const detailsRef = useRef(null);

  // 🚀 Fetch data
  useEffect(() => {
    const fetchNeo = async () => {
      try {
        const res = await getNeo();
        const neo = res.near_earth_objects || {};

        const sortedDates = Object.keys(neo).sort(
          (a, b) => new Date(a) - new Date(b)
        );

        setDates(sortedDates);
        setRawData(neo);
        setRange([0, sortedDates.length - 1]);
      } catch (err) {
        console.error("Neo fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNeo();
  }, []);

  // 🔥 Filters (CI-safe)
  const applyFilters = useCallback(() => {
    if (!dates.length) return;

    const selectedDates = dates.slice(range[0], range[1] + 1);

    const formatted = selectedDates.map((date) => {
      let asteroids = rawData[date] || [];

      const hazardousCount = asteroids.filter(
        (a) => a.is_potentially_hazardous_asteroid
      ).length;

      if (hazardOnly) {
        asteroids = asteroids.filter(
          (a) => a.is_potentially_hazardous_asteroid
        );
      }

      return {
        date,
        count: asteroids.length,
        hazardous: hazardousCount,
      };
    });

    setFilteredData(formatted);
  }, [dates, range, rawData, hazardOnly]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const total = filteredData.reduce((sum, d) => sum + d.count, 0);

  if (loading) {
    return <p className="text-gray-400">Loading asteroid data...</p>;
  }

  return (
    <div className="space-y-6">
      {/* 🔥 Title */}
      <h1 className="text-2xl font-bold">☄️ Asteroid Analytics</h1>

      {/* 🎛 Filters */}
      <div className="bg-gray-900 p-6 rounded-xl space-y-4 shadow-lg">
        <div>
          <p className="text-sm text-gray-400 mb-2">Date Range</p>

          <Slider
            range
            min={0}
            max={dates.length - 1}
            value={range}
            onChange={setRange}
          />

          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>{dates[range[0]]}</span>
            <span>{dates[range[1]]}</span>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={hazardOnly}
            onChange={() => setHazardOnly(!hazardOnly)}
          />
          Hazardous Only
        </label>
      </div>

      {/* 📊 Total */}
      <motion.div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-lg mb-2">Total Asteroids</h2>
        <p className="text-3xl font-bold">{total}</p>
      </motion.div>

      {/* 📈 Chart */}
      <motion.div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-lg mb-4">Asteroid Trends</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={filteredData}
            onClick={(e) => {
              if (!e || !e.activeLabel) return;

              const date = e.activeLabel;
              let asteroids = rawData[date] || [];

              if (hazardOnly) {
                asteroids = asteroids.filter(
                  (a) => a.is_potentially_hazardous_asteroid
                );
              }

              setSelectedDate(date);
              setSelectedAsteroids(asteroids);

              // 🔥 Smooth scroll
              setTimeout(() => {
                detailsRef.current?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip content={<CustomTooltip />} />

            {/* 🟣 Total */}
            <Line
              type="monotone"
              dataKey="count"
              stroke="#6366f1"
              strokeWidth={3}
              name="Total"
              dot={(props) => {
                const { cx, cy, payload } = props;
                const isSelected = payload.date === selectedDate;

                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 8 : 4}
                    fill={isSelected ? "#22c55e" : "#6366f1"}
                    style={{
                      filter: isSelected
                        ? "drop-shadow(0 0 8px #22c55e)"
                        : "none",
                    }}
                  />
                );
              }}
            />

            {/* 🔴 Hazard */}
            <Line
              type="monotone"
              dataKey="hazardous"
              stroke="#ef4444"
              strokeWidth={3}
              name="Hazardous"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* 🔥 DETAILS PANEL */}
      {selectedDate && (
        <motion.div
          ref={detailsRef}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              🚀 Asteroids on{" "}
              <span className="text-green-400">{selectedDate}</span>
            </h2>

            <button
              onClick={() => setSelectedDate(null)}
              className="text-gray-400 hover:text-white"
            >
              ✖
            </button>
          </div>

          {selectedAsteroids.length === 0 ? (
            <p className="text-gray-400">No data available</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {selectedAsteroids.slice(0, 8).map((a) => (
                <motion.div
                  key={a.id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                >
                  <p className="font-semibold">{a.name}</p>

                  <p className="text-sm text-gray-400">
                    Diameter:{" "}
                    {Math.round(
                      a?.estimated_diameter?.meters
                        ?.estimated_diameter_max || 0
                    )}{" "}
                    m
                  </p>

                  <p className="text-sm text-gray-400">
                    Speed:{" "}
                    {Math.round(
                      a?.close_approach_data?.[0]?.relative_velocity
                        ?.kilometers_per_hour || 0
                    )}{" "}
                    km/h
                  </p>

                  <p
                    className={`text-sm ${
                      a.is_potentially_hazardous_asteroid
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {a.is_potentially_hazardous_asteroid
                      ? "⚠ Hazardous"
                      : "Safe"}
                  </p>

                  <a
                    href={a.nasa_jpl_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block px-3 py-1 bg-blue-600 hover:bg-blue-700 text-xs rounded-lg"
                  >
                    View on NASA →
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

/* 🔥 Tooltip */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const total = payload.find((p) => p.name === "Total")?.value;
  const hazard = payload.find((p) => p.name === "Hazardous")?.value;

  return (
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-xl shadow-xl">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-indigo-400 font-bold">🟣 {total} total</p>
      <p className="text-red-400 font-bold">🔴 {hazard} hazardous</p>
    </div>
  );
}