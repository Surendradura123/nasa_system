import { useEffect, useState } from "react";
import { getEpic } from "../services/api";

export default function Epic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getEpic().then(setData);
  }, []);

  if (!data.length) return <p>No EPIC data available</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🌍 Earth (EPIC)</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.slice(0, 6).map((img, i) => (
          <div key={i}>
            <img src={img.image} alt="earth" className="rounded-lg" />
            <p className="text-sm mt-2">{img.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}