import React, { useState, useEffect } from "react";

type Spec = {
  title: string;
  link: string;
  image: string;
  alt: string;
  description: string;
  category: string;
};

const specs: Spec[] = [
  {
    title: "Tires",
    link: "null",
    image: "/images/CleverGirl/Tires.jpg",
    alt: "null",
    description: "null",
    category: "Wheels & Tires",
  },
  {
    title: "Rims",
    link: "null",
    image: "/images/CleverGirl/Rims.jpg",
    alt: "null",
    description:
      "null",
    category: "Wheels & Tires",
  },
  {
    title: "Lift Kit",
    link: "null",
    image: "/images/CleverGirl/LiftKit.jpg",
    alt: "null",
    description:
      "null",
    category: "Suspension",
  },
  {
    title: "Winch Mount",
    link: "null",
    image: "/images/CleverGirl/WinchMount.jpg",
    alt: "null",
    description: "null",
    category: "Recovery",
  },
  {
    title: "Winch",
    link: "null",
    image: "/images/CleverGirl/Winch.jpg",
    alt: "null",
    description: "null",
    category: "Recovery",
  },
  {
    title: "Roof Light Bar",
    link: "null",
    image: "/images/CleverGirl/null.jpg",
    alt: "null",
    description:
      'null"',
    category: "Lighting",
  },
  {
    title: "Upper A-Pillar Lights",
    link: "null",
    image: "/images/CleverGirl/UpperAPillar.jpg",
    alt: "null",
    description: "null",
    category: "Lighting",
  },
  {
    title: "Lower A-Pillar Lights",
    link: "null",
    image: "/images/CleverGirl/AuxbeamLowerLights.jpg",
    alt: "null",
    description: "null.",
    category: "Lighting",
  },
  {
    title: "A-Pillar Dual Light Mount",
    link: "null",
    image: "/images/CleverGirl/APillarDualMount.jpg",
    alt: "A-Pillar Dual Light Mount",
    description: "Mount to hold dual lights on the A-pillar for better light placement.",
    category: "Lighting",
  },
  {
    title: "Jumper Cables",
    link: "https://www.amazon.com/dp/B0D9NH7PZ1",
    image: "/images/CleverGirl/JumperCables.jpg",
    alt: "0-Gauge Jumper Cables with Anderson Connector",
    description:
      "30ft, 0-gauge heavy-duty jumper cables mounted to the front bumper with an Anderson connector wired to power the winch.",
    category: "Recovery",
  },
  {
    title: "Heavy DUTY STEERING UPGRADE KIT",
    link: "null",
    image: "/images/CleverGirl/SteeringRack.jpg",
    alt: "Heavy Duty Steering Rack",
    description: "text here.",
    category: "Steering",
  },
  {
    title: "Front Bumper",
    link: "null",
    image: "/images/CleverGirl/FrontBumper.jpg",
    alt: "Front Bumper",
    description: "null",
    category: "Recovery",
  },
];

const categories = [
  "All",
  "Wheels & Tires",
  "Suspension",
  "Recovery",
  "Lighting",
  "Steering",
];

const CleverGirl = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredSpecs =
    activeCategory === "All"
      ? specs
      : specs.filter((spec) => spec.category === activeCategory);

  return (
    <div className="w-full px-6 pt-50 space-y-8">
      {/* Clever Girl Image */}
      <div className="w-full rounded-xl overflow-hidden shadow-lg mb-0">
        <img
          src="/images/CleverGirl/CleverGirl.jpg"
          alt="Clever Girl TJ"
          loading="lazy"
          className="w-full object-cover"
          style={{
            paddingTop: "400px",
            transform: "scale(0.5)",
            transformOrigin: "top center",
            display: "block",
            marginBottom: "-1000px",
          }}
        />
      </div>

      <h1 className="text-yellow-400 text-4xl font-bold text-center mt-0">
        Clever Girl Specs
      </h1>

      <p className="text-center text-gray-300 max-w-3xl mx-auto px-4">
        Here’s a detailed look at the key components and upgrades that make the
        Muddy Duck Bronco a beast on and off the trail. From tires to lighting,
        each part is chosen to boost performance and style.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full font-semibold transition-shadow duration-300
            ${
              activeCategory === category
                ? "bg-[#242424] text-[#eeee24] shadow-[0_0_8px_2px_rgba(238,238,36,0.75)]"
                : "bg-gray-800 text-[#646cff] hover:shadow-[0_0_6px_2px_rgba(238,238,36,0.5)]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {filteredSpecs.map(({ title, link, image, alt, description }) => (
          <a
            key={title}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[280px] max-w-sm rounded-2xl border border-transparent bg-[#1a1a1a] p-4 text-yellow-300 shadow-md transition hover:border-yellow-300 hover:shadow-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <img
              src={image}
              alt={alt}
              loading="lazy"
              className="rounded-md w-full mb-2 object-cover"
            />
            <p className="text-gray-300">{description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CleverGirl;
