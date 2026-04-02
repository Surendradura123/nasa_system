import { useEffect, useState } from "react";
import { getNeo } from "../services/api";

export default function Neo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getNeo();

        const neoData = res.near_earth_objects;

        const chartData = Object.keys(neoData).map((date) => ({
          date,
          count: neoData[date].length
        }));

        setData(chartData);
      } catch (err) {
        setData([]);
      }
    };

    fetchData();
  }, []); // ✅ no warning now

  if (!data.length) {
    return <p className="text-gray-400">No data</p>;
  }

  return (
    <div>
      <h2>Neo Data</h2>
      {data.map((d, i) => (
        <p key={i}>
          {d.date}: {d.count}
        </p>
      ))}
    </div>
  );
}