import { useEffect, useState } from "react";
import { getMars } from "../api";

export default function Mars() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getMars()
      .then(setData)
      .catch(() => setData({ photos: [] }));
  }, []);

  if (!data) return <p>Loading Mars photos...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🚀 Mars Rover Photos</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.photos.slice(0, 6).map((img) => (
          <img
            key={img.id}
            src={img.img_src}
            alt="mars"
            className="rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}