import React from "react";
import Events from "./Events";
import Trails from "./Trails";

const Destinations: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white px-4 py-8">
      <h1 className="text-center text-4xl font-extrabold mb-10" style={{ color: "#EEEE24" }}>
        Destinations
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-4 rounded-2xl border border-yellow-500 shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-300 mb-4">Upcoming Events</h2>
          <Events />
        </div>

        <div className="bg-gray-800 p-4 rounded-2xl border border-yellow-500 shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-300 mb-4">Trail Highlights</h2>
          <Trails />
        </div>
      </div>
    </div>
  );
};

export default Destinations;
