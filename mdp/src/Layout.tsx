import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="pt-16 px-4 min-h-screen flex flex-col">
      {children}
    </div>
  );
};

export default Layout;