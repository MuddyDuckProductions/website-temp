// src/OnX.tsx
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "react-modal";
import L from "leaflet";

type Trail = {
  file: string;
  name: string;
  displayName: string;
  geoJson: GeoJSON.FeatureCollection;
  bounds: [[number, number], [number, number]];
  firstTime: string;
  location?: string;
  description?: string;
  difficulty?: "Easy" | "Moderate" | "Hard";
};

const FitBounds: React.FC<{ bounds: L.LatLngBoundsExpression }> = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [10, 10] });
  }, [bounds, map]);
  return null;
};

const formatDateTime = (iso: string): string => {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "Unknown";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()} - ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const OnX: React.FC = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/trails/trails.json").then((r) => r.json()),
      fetch("/trails/meta.json").then((r) => r.json()),
    ])
      .then(
        ([
          rawTrails,
          meta,
        ]: [
          Omit<Trail, "displayName" | "firstTime">[],
          { file: string; displayName: string; location?: string; description?: string; difficulty?: string }[]
        ]) => {
          const metaMap = Object.fromEntries(meta.map((m) => [m.file, m]));

          const withTimes: Trail[] = rawTrails
            .map((t) => {
              const feat = t.geoJson.features[0];
              const time = feat?.properties?.time as string;
              const meta = metaMap[t.file] || {};
              return {
                ...t,
                firstTime: time,
                displayName: meta.displayName || t.name,
                location: meta.location || "Unknown",
                description: meta.description || "No description provided.",
                difficulty: meta.difficulty || "Moderate",
              };
            })
            .sort(
              (a, b) =>
                new Date(b.firstTime).getTime() - new Date(a.firstTime).getTime()
            );

          setTrails(withTimes);
        }
      )
      .catch((err) => console.error("Error loading trails or meta:", err));
  }, []);

  const renderPolyline = (geoJson: GeoJSON.FeatureCollection) => {
    const coords = geoJson.features.flatMap((f) =>
      (f.geometry as GeoJSON.LineString).coordinates.map(
        ([lng, lat]) => [lat, lng] as [number, number]
      )
    );
    return <Polyline positions={coords} pathOptions={{ color: "#eeee24" }} />;
  };

  const satelliteLayer = (
    <TileLayer
      attribution="Map data ©2025 Google"
      url="https://mt{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
      subdomains={["0", "1", "2", "3"]}
    />
  );

  return (
    <div className="flex-1 pt-14 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#eeee24]">Trail Maps</h2>

      {/* Mini-map grid */}
      <div className="flex flex-wrap gap-4 justify-center">
        {trails.map((trail, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="w-[300px] h-[200px] cursor-pointer border border-gray-700"
              onClick={() => setSelectedTrail(trail)}
            >
              <MapContainer
                className="w-full h-full"
                zoom={13}
                scrollWheelZoom={false}
                center={[
                  (trail.bounds[0][0] + trail.bounds[1][0]) / 2,
                  (trail.bounds[0][1] + trail.bounds[1][1]) / 2,
                ]}
              >
                {satelliteLayer}
                <FitBounds bounds={trail.bounds} />
                {renderPolyline(trail.geoJson)}
              </MapContainer>
            </div>
            <div
              className="mt-2 text-center font-medium"
              style={{ color: "#eeee24" }}
            >
              {trail.displayName}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for enlarged map */}
      <Modal
        isOpen={!!selectedTrail}
        onRequestClose={() => setSelectedTrail(null)}
        ariaHideApp={false}
        style={{
          overlay: {
            zIndex: 2000,
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          content: {
            width: "90%",
            height: "80%",
            margin: "auto",
            padding: "0",
            backgroundColor: "#000000",
            border: "none",
            display: "flex",
            gap: "1rem",
          },
        }}
      >
        {selectedTrail && (
          <>
            <div style={{ flex: 3 }}>
              <MapContainer
                className="w-full h-full"
                zoom={13}
                scrollWheelZoom
                center={[
                  (selectedTrail.bounds[0][0] + selectedTrail.bounds[1][0]) / 2,
                  (selectedTrail.bounds[0][1] + selectedTrail.bounds[1][1]) / 2,
                ]}
              >
                {satelliteLayer}
                <FitBounds bounds={selectedTrail.bounds} />
                {renderPolyline(selectedTrail.geoJson)}
              </MapContainer>
            </div>

            <div style={{ flex: 1, padding: "1rem", color: "#eeee24" }}>
              <h2 className="text-2xl font-bold mb-4">
                {selectedTrail.displayName}
              </h2>
              <p className="mb-2">
                <strong>Location:</strong> {selectedTrail.location}
              </p>
              <p className="mb-2">
                <strong>Description:</strong> {selectedTrail.description}
              </p>
              <p className="mb-2">
                <strong>Difficulty:</strong>{" "}
                <span
                  style={{
                    color:
                      selectedTrail.difficulty === "Easy"
                        ? "#00ff00"
                        : selectedTrail.difficulty === "Moderate"
                        ? "#eeee24"
                        : "#ff0000",
                  }}
                >
                  {selectedTrail.difficulty}
                </span>
              </p>
              <p className="mb-2">
                <strong>Date & Time:</strong> {formatDateTime(selectedTrail.firstTime)}
              </p>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default OnX;
