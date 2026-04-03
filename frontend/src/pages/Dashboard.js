import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getNeo, getMars, getEpic, getApod } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    neo: 0,
    mars: 0,
    epic: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [apod, setApod] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const neo = await getNeo();
      const mars = await getMars();
      const epic = await getEpic();
      const apodData = await getApod();

      const neoCount = Object.values(
        neo.near_earth_objects || {}
      ).flat().length;

      setStats({
        neo: neoCount,
        mars: mars.photos?.length || 0,
        epic: epic.length || 0,
      });

      setChartData([
        { name: "Asteroids", value: neoCount },
        { name: "Mars Photos", value: mars.photos?.length || 0 },
        { name: "EPIC", value: epic.length || 0 },
      ]);

      setApod(apodData);
    } catch (err) {
      console.error("Dashboard error", err);
    }
  };

  return (
    <div className="space-y-6">

      {/* 🌌 APOD HERO */}
      {apod && (
        <motion.div
          className="relative rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <img
            src={apod.url}
            alt={apod.title}
            className="w-full h-[300px] object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
            <h2 className="text-2xl font-bold">{apod.title}</h2>
            <p className="text-sm text-gray-300 line-clamp-2">
              {apod.explanation}
            </p>
          </div>
        </motion.div>
      )}

      {/* 📊 TITLE */}
      <h1 className="text-2xl font-bold">📊 Dashboard Overview</h1>

      {/* 🧩 CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Asteroids" value={stats.neo} icon="☄️" />
        <Card title="Mars Photos" value={stats.mars} icon="🚗" />
        <Card title="EPIC Images" value={stats.epic} icon="🌍" />
      </div>

      {/* 📈 CHART */}
      <motion.div
        className="bg-gray-900 p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg mb-4">📈 Data Overview</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-900 p-6 rounded-xl shadow-lg flex justify-between items-center"
    >
      <div>
        <p className="text-gray-400">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>

      <div className="text-3xl">{icon}</div>
    </motion.div>
  );
}