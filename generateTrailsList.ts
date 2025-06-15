import { readdirSync, writeFileSync } from "fs";
import { join, extname } from "path";

const trailsDir = join(__dirname, "mdp", "public", "trails");
const outputFile = join(trailsDir, "trails.json");

const gpxFiles = readdirSync(trailsDir).filter(file => extname(file).toLowerCase() === ".gpx");

writeFileSync(outputFile, JSON.stringify(gpxFiles, null, 2));
console.log(`✅ trails.json updated with ${gpxFiles.length} file(s)`);