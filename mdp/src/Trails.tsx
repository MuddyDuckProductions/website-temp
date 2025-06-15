import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";

type RawTrail = {
  file: string;
  name: string;
  geoJson: GeoJSON.FeatureCollection;
  bounds: [[number, number], [number, number]];
  firstTime: string;
};

type Meta = {
  file: string;
  displayName?: string;
  location?: string;
  difficulty?: "Easy" | "Moderate" | "Hard";
  description?: string;
};

type Trail = RawTrail & Meta;

const FitBounds: React.FC<{ bounds: L.LatLngBoundsExpression }> = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [5, 5] });
  }, [bounds, map]);
  return null;
};

const Trails: React.FC = () => {
  const [trails, setTrails] = useState<Trail[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/trails/trails.json").then((r) => r.json()),
      fetch("/trails/meta.json")
        .then((r) => r.text())
        .then((txt) => {
          try {
            return txt.trim() ? JSON.parse(txt) : [];
          } catch {
            console.warn("meta.json invalid, defaulting to []");
            return [];
          }
        }),
    ])
      .then(([rawTrails, meta]: [RawTrail[], Meta[]]) => {
        const metaMap = Object.fromEntries(meta.map((m) => [m.file, m]));
        const merged: Trail[] = rawTrails.map((t) => ({
          ...t,
          ...metaMap[t.file],
        }));
        merged.sort(
          (a, b) =>
            new Date(b.firstTime).getTime() - new Date(a.firstTime).getTime()
        );
        setTrails(merged.slice(0, 3));
      })
      .catch((err) => console.error("Error loading trails or meta:", err));
  }, []);

  const satelliteLayer = (
    <TileLayer
      url="https://mt{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
      subdomains={["0", "1", "2", "3"]}
    />
  );

  return (
    <div className="p-6 text-white space-y-6">
      <h1 className="text-3xl font-bold text-center" style={{ color: "#eeee24" }}>
        Latest Trails
      </h1>

      {trails.map((t) => {
        const displayName = t.displayName || t.name;
        const location = t.location || "Location: N/A";
        const difficulty = t.difficulty || "Moderate";
        const description = t.description || "No description provided.";

        return (
          <div
            key={t.file}
            className="flex bg-gray-800 rounded-xl overflow-hidden md:h-auto"
          >
            <div className="flex items-center justify-center w-full md:w-[300px] p-2 border-b md:border-b-0 md:border-r border-gray-700">
              <Link
                to={`/onx?highlight=${encodeURIComponent(t.file)}`}
                className="block w-full aspect-[3/2] md:h-[240px] md:w-full hover:brightness-90 transition"
              >
                <MapContainer
                  className="w-full h-full"
                  zoom={13}
                  scrollWheelZoom={false}
                  zoomControl={false}
                  center={[
                    (t.bounds[0][0] + t.bounds[1][0]) / 2,
                    (t.bounds[0][1] + t.bounds[1][1]) / 2,
                  ]}
                >
                  {satelliteLayer}
                  <FitBounds bounds={t.bounds} />
                  <Polyline
                    positions={t.geoJson.features.flatMap((f) =>
                      (f.geometry as GeoJSON.LineString).coordinates.map(
                        ([lng, lat]) => [lat, lng] as [number, number]
                      )
                    )}
                    pathOptions={{ color: "#eeee24" }}
                  />
                </MapContainer>
              </Link>
            </div>

            <div className="flex flex-col justify-center p-4 flex-1 min-h-[240px]">
              <h2 className="text-xl font-semibold mb-1" style={{ color: "#eeee24" }}>
                {displayName}
              </h2>
              <p className="text-sm text-gray-300">{location}</p>
              <p className="text-sm mb-2">
                <span className="font-semibold">Difficulty:</span>{" "}
                <span
                  style={{
                    color:
                      difficulty === "Easy"
                        ? "#00ff00"
                        : difficulty === "Moderate"
                        ? "#eeee24"
                        : "#ff0000",
                  }}
                >
                  {difficulty}
                </span>
              </p>
              <p className="text-sm text-gray-200 whitespace-pre-wrap">
                {description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Trails;
