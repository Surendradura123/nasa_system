import { useEffect, useState } from "react";
import { getMars } from "../api";

export default function Mars() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getMars().then(data => setPhotos(data.photos));
  }, []);

  return (
    <div>
      <h2>Mars Rover Photos</h2>
      <div className="grid">
        {photos.slice(0, 6).map(photo => (
          <img key={photo.id} src={photo.img_src} alt="mars" />
        ))}
      </div>
    </div>
  );
}