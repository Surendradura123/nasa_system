import { useEffect, useState } from "react";
import { getEpic } from "../services/api";

export default function Epic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getEpic();
      setData(res || []);
    };

    fetchData();
  }, []);

  if (!data.length) return <p>No EPIC data</p>;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="glass p-6">
        <h2 className="text-xl font-bold mb-4">
            🌍 Earth from Space (EPIC)
        </h2>
    
      
        {data.slice(0, 6).map((img, i) => {
          if (!img?.date) return null;

          const d = img.date.split(" ")[0].replace(/-/g, "/");

          return (
            <img
              key={i}
              src={`https://epic.gsfc.nasa.gov/archive/natural/${d}/png/${img.image}.png`}
              alt=""
            />
          );
        })}
      </div>
    </div>
  );
}