// src/Header.tsx
import React from "react";
import SubHeader from "./SubHeader";
import NavBar from "./NavBar";

function Header() {
  return (
    <div
      id="site-header"
      className="fixed top-0 left-0 w-full z-[1000] bg-[#242424] border-b-4 border-[#242424]"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <SubHeader />
        <NavBar />
      </div>
    </div>
  );
}

export default Header;
