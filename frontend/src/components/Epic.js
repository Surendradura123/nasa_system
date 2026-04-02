import { useEffect, useState } from "react";
import { getEpic } from "../api";

export default function Epic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getEpic().then(setData);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🌍 Earth (EPIC)</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.slice(0, 6).map((img, i) => (
          <p key={i} className="text-gray-400">
            {img.caption}
          </p>
        ))}
      </div>
    </div>
  );
}