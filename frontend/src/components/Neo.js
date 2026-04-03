import { useEffect, useState } from "react";
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

  const [selectedAsteroid, setSelectedAsteroid] = useState(null);

  useEffect(() => {
    fetchNeo();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [rawData, range, hazardOnly]);

  const fetchNeo = async () => {
    try {
      const res = await getNeo();
      const neoData = res.near_earth_objects || {};

      const sortedDates = Object.keys(neoData).sort(
        (a, b) => new Date(a) - new Date(b)
      );

      setDates(sortedDates);
      setRawData(neoData);
      setRange([0, sortedDates.length - 1]);
    } catch (err) {
      console.error("Neo error", err);
    }
  };

  const applyFilters = () => {
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
  };

  const total = filteredData.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="space-y-6">

      {/* 🔥 TITLE */}
      <h1 className="text-2xl font-bold">☄️ Asteroid Analytics</h1>

      {/* 🎛 FILTER PANEL */}
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

        <p className="text-xs text-gray-400">
          Showing {filteredData.length} days
        </p>
      </div>

      {/* 📊 TOTAL */}
      <motion.div
        className="bg-gray-900 p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-lg mb-2">Total Asteroids</h2>
        <p className="text-3xl font-bold">{total}</p>
      </motion.div>

      {/* 📈 CHART */}
      <motion.div
        className="bg-gray-900 p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg mb-4">Asteroids Per Day</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={filteredData}
            onClick={(e) => {
              if (!e || !e.activeLabel) return;

              const date = e.activeLabel;
              setSelectedDate(date);
              setSelectedAsteroids(rawData[date] || []);
            }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#6366f1"
              strokeWidth={3}
              dot={(props) => {
                const { cx, cy, payload } = props;

                return payload.hazardous > 0 ? (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill="red"
                    style={{ filter: "drop-shadow(0 0 6px red)" }}
                  />
                ) : (
                  <circle cx={cx} cy={cy} r={4} fill="#6366f1" />
                );
              }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* 🧠 ASTEROID LIST */}
      {selectedDate && (
        <motion.div
          className="bg-gray-900 p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-xl font-bold mb-4">
            Asteroids on {selectedDate}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {selectedAsteroids.slice(0, 6).map((a) => (
              <motion.div
                key={a.id}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedAsteroid(a)}
                className="bg-gray-800 p-4 rounded-lg cursor-pointer"
              >
                <p className="font-semibold">{a.name}</p>
                <p className="text-sm text-gray-400">
                  Diameter:{" "}
                  {Math.round(
                    a.estimated_diameter.meters
                      .estimated_diameter_max
                  )} m
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 🪟 MODAL */}
      {selectedAsteroid && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-gray-900 p-6 rounded-xl max-w-lg w-full relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <button
              className="absolute top-3 right-3 text-gray-400"
              onClick={() => setSelectedAsteroid(null)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">
              {selectedAsteroid.name}
            </h2>

            <div className="space-y-2 text-sm">
              <p>
                🌍 Diameter:{" "}
                {Math.round(
                  selectedAsteroid.estimated_diameter.meters
                    .estimated_diameter_max
                )} m
              </p>

              <p>
                🚀 Speed:{" "}
                {Math.round(
                  selectedAsteroid.close_approach_data[0]
                    ?.relative_velocity?.kilometers_per_hour
                )} km/h
              </p>

              <p>
                📏 Miss Distance:{" "}
                {Math.round(
                  selectedAsteroid.close_approach_data[0]
                    ?.miss_distance?.kilometers
                )} km
              </p>

              <p
                className={
                  selectedAsteroid.is_potentially_hazardous_asteroid
                    ? "text-red-400"
                    : "text-green-400"
                }
              >
                {selectedAsteroid.is_potentially_hazardous_asteroid
                  ? "⚠ Hazardous"
                  : "Safe"}
              </p>

              <a
                href={selectedAsteroid.nasa_jpl_url}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 underline"
              >
                View on NASA →
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

/* 🔥 TOOLTIP */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 border border-gray-700 p-4 rounded-xl shadow-xl"
    >
      <p className="text-sm text-gray-400">{label}</p>

      <p className="text-lg font-bold text-indigo-400">
        {data.count} asteroids
      </p>

      <p className="text-sm text-red-400">
        ⚠ {data.hazardous} hazardous
      </p>
    </motion.div>
  );
}