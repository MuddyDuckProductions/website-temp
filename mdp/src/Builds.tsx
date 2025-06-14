import React from "react";
import { useNavigate } from "react-router-dom";

const Builds = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-full p-7">
      <h1 className="text-center text-4xl font-bold text-yellow-500 mb-8">
        Builds
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        {/* Muddy Duck */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate("/MuddyDuck")}
          className="flex-1 bg-gray-800 rounded-xl text-center shadow-lg p-4 cursor-pointer"
          onKeyDown={(e) => e.key === 'Enter' && navigate("/MuddyDuck")}
        >
          <h2 className="text-2xl font-bold mb-4 text-[#eeee24]">Muddy Duck</h2>
          <img
            src="/images/MuddyDuck/MuddyDuck.jpg"
            alt="Muddy Duck"
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>

        {/* Exciting Info Card */}
        <div className="flex-1 bg-gray-800 rounded-xl text-center shadow-lg p-8 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold mb-4 text-[#eeee24]">Dive Into Our Builds!</h2>
          <p className="text-lg text-gray-300">
            Tap the pictures to uncover every upgrade, mod, and wild adventure
            we've poured into these beasts. Get ready to geek out on all things
            offroad!
          </p>
        </div>

        {/* Clever Girl */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate("/CleverGirl")}
          className="flex-1 bg-gray-800 rounded-xl text-center shadow-lg p-4 cursor-pointer"
          onKeyDown={(e) => e.key === 'Enter' && navigate("/CleverGirl")}
        >
          <h2 className="text-2xl font-bold mb-4 text-[#eeee24]">Clever Girl</h2>
          <img
            src="/images/CleverGirl/CleverGirl.jpg"
            alt="Clever Girl"
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Builds;
