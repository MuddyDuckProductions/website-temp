// scripts/generateTrails.js
import fs from "fs";
import path from "path";
import { DOMParser } from "@xmldom/xmldom";
import toGeoJSON from "@mapbox/togeojson";
import dotenv from "dotenv";

dotenv.config();
const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  console.error("❌ Set your Google Maps API key in GOOGLE_API_KEY");
  process.exit(1);
}

const trailsDir  = path.join(process.cwd(), "public", "trails");
const metaPath   = path.join(trailsDir, "meta.json");
const outputPath = path.join(trailsDir, "trails.json");

async function reverseGeocode(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
  const res = await fetch(url);
  const { results } = await res.json();
  if (!results.length) return { city: "", state: "" };

  let city = "", state = "";
  for (const comp of results[0].address_components) {
    if (comp.types.includes("locality"))      city = comp.long_name;
    if (comp.types.includes("administrative_area_level_1")) state = comp.short_name;
  }
  return { city, state };
}

async function getElevation(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/elevation/json?locations=${lat},${lng}&key=${API_KEY}`;
  const res = await fetch(url);
  const { results } = await res.json();
  return results[0]?.elevation ?? null;
}

async function main() {
  // 1. Load or init meta.json
  let meta = [];
  if (fs.existsSync(metaPath)) {
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
    } catch {
      console.warn("⚠️ meta.json invalid; resetting to []");
      meta = [];
    }
  }

  // 2. Auto-add new GPX entries
  const existing = new Set(meta.map(m => m.file));
  const gpxFiles = fs.readdirSync(trailsDir).filter(f => f.toLowerCase().endsWith(".gpx"));
  for (const file of gpxFiles) {
    if (!existing.has(file)) {
      console.log(`➕ Adding meta entry for ${file}`);
      meta.push({
        file,
        displayName: "Temp Name",
        location: "",
        difficulty: "",
        description: "",
        elevation: null,
      });
      existing.add(file);
    }
  }

  // 3. Process each GPX: build trails.json and enrich meta entries
  const domParser = new DOMParser();
  const trails = [];

  for (const m of meta) {
    const file = m.file;
    const gpxPath = path.join(trailsDir, file);
    if (!fs.existsSync(gpxPath)) continue;

    // Parse to GeoJSON
    const xml     = domParser.parseFromString(fs.readFileSync(gpxPath, "utf8"), "text/xml");
    const geoJson = toGeoJSON.gpx(xml);

    // Flatten coords and skip empties
    const coords = geoJson.features.flatMap(f => (f.geometry.coordinates || []).map(([lng, lat]) => [lat, lng]));
    if (!coords.length) continue;

    // Bounds & firstTime
    const lats = coords.map(c => c[0]), lngs = coords.map(c => c[1]);
    const bounds = [
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)],
    ];
    const firstFeat = geoJson.features[0];
    const firstTime = firstFeat?.properties?.time || "";

    // Reverse-geocode + elevation on first point
    const [lat, lng] = coords[0];
    const { city, state } = await reverseGeocode(lat, lng);
    const elevation      = await getElevation(lat, lng);

    // Update meta entry
    m.location  = city && state ? `${city}, ${state}` : "";
    m.elevation = elevation;

    // Collect trail info
    trails.push({ file, geoJson, bounds, firstTime });
  }

  // 4. Write out
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n", "utf8");
  console.log(`✅ meta.json updated (${meta.length} entries)`);

  fs.writeFileSync(outputPath, JSON.stringify(trails, null, 2) + "\n", "utf8");
  console.log(`✅ trails.json generated (${trails.length} trails)`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
