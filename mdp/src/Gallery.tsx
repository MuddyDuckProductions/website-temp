// src/Gallery.tsx
import React, { useEffect, useState } from "react";

type TrailImage = {
  filename: string;
};

const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
            const res = await fetch("http://muddyduckproductions.com/api/gallery");
        if (!res.ok) throw new Error("Failed to load gallery");
        const data = await res.json();
        setImages(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Trail Gallery</h1>

      {loading && <p>Loading images...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((filename, index) => (
          <div key={index} className="rounded overflow-hidden shadow-lg">
            <img
              src={`https://muddyduckproductions.com/images/Gallery/${filename}`}
              alt={filename}
              className="w-full h-64 object-cover hover:scale-105 transition-transform"
            />
            <div className="p-2 text-center text-sm">{filename}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
