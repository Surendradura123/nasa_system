import { useEffect, useState } from "react";
import { getNeo } from "../services/api";
import { motion } from "framer-motion";
export default function NeoStats() {
  const [stats, setStats] = useState({
    total: 0,
    hazardous: 0,
    max: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getNeo();
      const neo = res.near_earth_objects;

      let total = 0;
      let hazardous = 0;
      let max = 0;

      Object.values(neo).forEach((day) => {
        total += day.length;
        max = Math.max(max, day.length);

        day.forEach((obj) => {
          if (obj.is_potentially_hazardous_asteroid) {
            hazardous++;
          }
        });
      });

      setStats({ total, hazardous, max });
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      <Card title="Total Asteroids" value={stats.total} />
      <Card title="Hazardous" value={stats.hazardous} />
      <Card title="Max per Day" value={stats.max} />

    </div>
  );
}



function Card({ title, value }) {
  return (
    <motion.div
      className="bg-gray-900 p-5 rounded-2xl shadow-lg"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </motion.div>
  );
}