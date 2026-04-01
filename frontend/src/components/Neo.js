import { useEffect, useState } from "react";
import { getNeo } from "../api";

export default function Neo() {
  const [neo, setNeo] = useState(null);

  useEffect(() => {
    getNeo().then(setNeo);
  }, []);

  if (!neo) return <p>Loading NEO data...</p>;

  const count = Object.keys(neo.near_earth_objects).length;

  return (
    <div className="card">
      <h2>Near Earth Objects</h2>
      <p>Days tracked: {count}</p>
    </div>
  );
}