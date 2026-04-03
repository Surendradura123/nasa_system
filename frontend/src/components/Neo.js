import { useEffect, useState, useCallback } from "react";
import { getNeo } from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Scatter,
} from "recharts";

export default function Neo() {
  const [rawData, setRawData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [dates, setDates] = useState([]);
  const [range, setRange] = useState([0, 4]);
  const [hazardOnly, setHazardOnly] = useState(false);
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🚀 Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNeo();
        const neo = data.near_earth_objects || {};

        setRawData(neo);
        setDates(Object.keys(neo));
      } catch (err) {
        console.error("Failed to fetch NEO");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔥 Apply filters (FIXED with useCallback)
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
        asteroids: asteroids,
      };
    });

    setFilteredData(formatted);
  }, [dates, range, rawData, hazardOnly]);

  // ✅ Safe useEffect
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // 🔥 Handle bar click
  const handleBarClick = (data) => {
    if (data?.activePayload?.[0]?.payload) {
      const asteroids = data.activePayload[0].payload.asteroids;
      setSelectedAsteroid(asteroids[0] || null);
    }
  };

  if (loading) {
    return <div className="text-gray-400">Loading asteroid data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 🔥 Title */}
      <h1 className="text-2xl font-bold">☄️ Asteroid Analytics</h1>

      {/* 🎛️ Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <label className="text-sm text-gray-400">
          Date Range:
          <input
            type="range"
            min="0"
            max={dates.length - 1}
            value={range[1]}
            onChange={(e) => setRange([0, Number(e.target.value)])}
            className="ml-2"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={hazardOnly}
            onChange={(e) => setHazardOnly(e.target.checked)}
          />
          Hazardous only
        </label>
      </div>

      {/* 📊 Chart */}
      <div className="bg-gray-900 p-4 rounded-xl shadow">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData} onClick={handleBarClick}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            {/* Total asteroids */}
            <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />

            {/* 🔴 Hazard dots */}
            <Scatter
              data={filteredData.map((d) => ({
                date: d.date,
                hazardous: d.hazardous,
              }))}
              fill="red"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📋 Selected asteroid details */}
      {selectedAsteroid && (
        <div className="bg-gray-900 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">
            🚀 Asteroid Details
          </h2>

          <p>
            <strong>Name:</strong> {selectedAsteroid.name}
          </p>

          <p>
            <strong>Hazardous:</strong>{" "}
            {selectedAsteroid.is_potentially_hazardous_asteroid
              ? "Yes 🚨"
              : "No"}
          </p>

          <p>
            <strong>Velocity:</strong>{" "}
            {
              selectedAsteroid.close_approach_data?.[0]
                ?.relative_velocity?.kilometers_per_hour
            }{" "}
            km/h
          </p>

          <p>
            <strong>Miss Distance:</strong>{" "}
            {
              selectedAsteroid.close_approach_data?.[0]
                ?.miss_distance?.kilometers
            }{" "}
            km
          </p>
        </div>
      )}
    </div>
  );
}