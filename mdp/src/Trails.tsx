import React from "react";

type Trail = {
  name: string;
  location: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  description: string;
  link?: string;
};

const dummyTrails: Trail[] = [
  {
    name: "Goose Creek Gulch",
    location: "Francis Marion National Forest, SC",
    difficulty: "Moderate",
    description: "A scenic trail with shallow water crossings, light mud, and deep woods. Great for overlanding.",
  },
  {
    name: "Swamp Fox Loop",
    location: "Berkeley County, SC",
    difficulty: "Easy",
    description: "Wide and well-maintained forest roads. Good for beginners or scenic cruises.",
  },
  {
    name: "Cypress Crawl",
    location: "Near Charleston, SC",
    difficulty: "Hard",
    description: "Tight trails, deep mud, and technical turns. Not recommended without lockers and a winch.",
  },
];

const Trails: React.FC = () => {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Trail Directory</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {dummyTrails.map((trail, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-2xl shadow-lg p-5 border border-yellow-500 hover:bg-gray-700 transition"
          >
            <h2 className="text-xl font-bold text-yellow-300">{trail.name}</h2>
            <p className="text-sm text-gray-400 mb-2">{trail.location}</p>
            <p className="text-sm mb-2">
              <span className="font-semibold">Difficulty:</span>{" "}
              <span
                className={
                  trail.difficulty === "Easy"
                    ? "text-green-400"
                    : trail.difficulty === "Moderate"
                    ? "text-yellow-400"
                    : "text-red-400"
                }
              >
                {trail.difficulty}
              </span>
            </p>
            <p className="text-sm mb-4">{trail.description}</p>
            {trail.link && (
              <a
                href={trail.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-yellow-400 underline"
              >
                View Trail Map
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trails;
