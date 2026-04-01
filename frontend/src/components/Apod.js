import { useEffect, useState } from "react";
import { getApod } from "../api";

export default function Apod() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getApod().then(setData);
  }, []);

  if (!data) return <p>Loading APOD...</p>;

  return (
    <div className="card">
      <h2>{data.title}</h2>
      <img src={data.url} alt={data.title} />
      <p>{data.explanation}</p>
    </div>
  );
}