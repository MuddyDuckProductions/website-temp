// src/AboutMe.tsx
import React from 'react';

function AboutMe() {
  return (
    <section className="w-screen bg-[#1e1e1e] text-white">
      <div className="w-full p-8 text-lg leading-relaxed space-y-4">
        <h1 className="text-5xl font-bold text-yellow-500 text-center">
          About Me
        </h1>
        <p>
          Hey there! I’m <strong>Mark</strong>, the guy behind <strong>Muddy Duck Offroad</strong>. 
          I drive a 2021 Ford Bronco Badlands and live for the thrill of mud, trails, and building rigs 
          that can take a beating and keep on crawling.
        </p>
        <p>
          My wife and I are turning offroading into a family adventure. She just picked up a 2003 Jeep TJ Wrangler 
          named <strong>"Clever Girl"</strong> — a Jurassic Park-themed build getting a serious makeover with long arms, lockers, 
          5.13 gears, and more.
        </p>
        <p>
          <strong>Muddy Duck Offroad</strong> is more than just a brand — it’s about living dirty, driving hard, 
          and enjoying the ride. Whether we're tackling gnarly trails, testing new gear, or cooking up wild meals 
          at events like Overland South, we’re all in.
        </p>
        <p className="text-yellow-400 text-xl font-semibold">
          Follow our builds, our adventures, and our mud-splattered lifestyle.
        </p>
        <p className="italic text-yellow-500 text-2xl">Stay Muddy.</p>
      </div>
    </section>
  );
}

export default AboutMe;
