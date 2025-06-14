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
    link: "https://www.bfgoodrichtires.com/tires/ko2",
    image: "/images/MuddyDuck/Tires.jpg",
    alt: "BFGoodrich K/O2 Tires",
    description: "BFGoodrich K/O2 Tires — currently installed but not fully satisfied.",
    category: "Wheels & Tires",
  },
  {
    title: "Rims",
    link: "https://www.ford.com/product/20212024-bronco-beadlock-capable-wheel-kit-wildtrak-p2835689268",
    image: "/images/MuddyDuck/Rims.jpg",
    alt: "Sasquatch Edition Rims Painted White",
    description:
      "Beadlock-capable wheel kit (Wildtrak) from Ford — ours are painted white for a unique look.",
    category: "Wheels & Tires",
  },
  {
    title: "Lift Kit",
    link: "https://www.roughcountry.com/product/configurable/ford-lift-kit-51027",
    image: "/images/MuddyDuck/LiftKit.jpg",
    alt: "Rough Country 3.5-inch Lift Kit with M1R Reservoir Struts",
    description:
      "Rough Country 3.5-inch lift kit with M1R reservoir struts for enhanced offroad capability.",
    category: "Suspension",
  },
  {
    title: "Winch Mount",
    link: "https://www.ford.com/product/20212024-ford-performance-parts-by-warn-bronco-winch-kit-p2760593812",
    image: "/images/MuddyDuck/WinchMount.jpg",
    alt: "Ford Performance Winch Mount for Everglades",
    description: "Ford Performance winch mount designed for the Everglades model.",
    category: "Recovery",
  },
  {
    title: "Winch",
    link: "https://www.roughcountry.com/product/13000-lb-winch-kit-rc12909",
    image: "/images/MuddyDuck/Winch.jpg",
    alt: "Rough Country 13,000 lb Winch",
    description: "Rough Country 13,000 lb winch to power through tough recovery situations.",
    category: "Recovery",
  },
  {
    title: "Roof Light Bar",
    link: "https://www.rigidindustries.com/2021-bronco-roof-rack-light-kit-with-a-sr-spot-flood-combo-bar-included-46726.html",
    image: "/images/MuddyDuck/Daymaker.jpg",
    alt: "Rigid Industries Roof Light Bar",
    description:
      'Rigid SR-Series Spot/Flood Combo light bar mounted to the roof rack — we jokingly call it the "Daymaker."',
    category: "Lighting",
  },
  {
    title: "Upper A-Pillar Lights",
    link: "https://auxbeam.com/products/zd000675?_pos=1&_psq=360&_ss=e&_v=1.0",
    image: "/images/MuddyDuck/UpperAPillar.jpg",
    alt: "Auxbeam Upper A-Pillar Lights",
    description: "Auxbeam 360° 9\" pods mounted high on the A-pillars for wide coverage.",
    category: "Lighting",
  },
  {
    title: "Lower A-Pillar Lights",
    link: "https://auxbeam.com/products/4-6-inch-60w-7200lm-led-pods-off-road-driving-light-1",
    image: "/images/MuddyDuck/AuxbeamLowerLights.jpg",
    alt: "Auxbeam Lower A-Pillar Lights",
    description: "Auxbeam 4.6-inch 60W 7200LM LED Pods for focused off-road lighting.",
    category: "Lighting",
  },
  {
    title: "A-Pillar Dual Light Mount",
    link: "https://www.amazon.com/dp/B0DD3J1X9Z?ref_=ppx_hzsearch_conn_dt_b_fed_asin_title_1&th=1",
    image: "/images/MuddyDuck/APillarDualMount.jpg",
    alt: "A-Pillar Dual Light Mount",
    description: "Mount to hold dual lights on the A-pillar for better light placement.",
    category: "Lighting",
  },
  {
    title: "Jumper Cables",
    link: "https://www.amazon.com/dp/B0D9NH7PZ1",
    image: "/images/MuddyDuck/JumperCables.jpg",
    alt: "0-Gauge Jumper Cables with Anderson Connector",
    description:
      "30ft, 0-gauge heavy-duty jumper cables mounted to the front bumper with an Anderson connector wired to power the winch.",
    category: "Recovery",
  },
  {
    title: "BRONCO SEVERE DUTY STEERING UPGRADE KIT",
    link: "https://performanceparts.ford.com/part/M-3200-WT",
    image: "/images/MuddyDuck/SteeringRack.jpg",
    alt: "Ford Performance Steering Rack",
    description: "Ford Performance Severe Duty Steering Upgrade Kit for enhanced steering response and durability.",
    category: "Steering",
  },
  {
    title: "Front Bumper",
    link: "https://www.ford.com/product/20212024-bronco-ford-performance-heavy-duty-modular-front-bumper-kit-p2735335186",
    image: "/images/MuddyDuck/FrontBumper.jpg",
    alt: "Ford Performance Front Bumper",
    description: "Ford Performance front bumper with LED light bar cutout.",
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

const MuddyDuck = () => {
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
      {/* Muddy Duck Image */}
      <div className="w-full rounded-xl overflow-hidden shadow-lg mb-0">
        <img
          src="/images/MuddyDuck/MuddyDuckOS.jpg"
          alt="Muddy Duck Bronco"
          loading="lazy"
          className="w-full object-cover"
          style={{
            paddingTop: "400px",
            transform: "scale(0.5)",
            transformOrigin: "top center",
            display: "block",
            marginBottom: "-600px",
          }}
        />
      </div>

      <h1 className="text-yellow-400 text-4xl font-bold text-center mt-0">
        Muddy Duck Specs
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

export default MuddyDuck;
