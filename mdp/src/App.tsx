
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Suspense, lazy } from "react";
import ScrollToTop from "./ScrollToTop";

const Home = lazy(() => import("./Home"));
const MuddyDuck = lazy(() => import("./MuddyDuck"));
const CleverGirl = lazy(() => import("./CleverGirl"));
const Calendar = lazy(() => import("./Calendar"));
const OnX = lazy(() => import("./OnX"));

export default function App() {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const hdr = document.getElementById("site-header");
    if (!hdr) return;
    setHeaderHeight(hdr.clientHeight);
    const onResize = () => setHeaderHeight(hdr.clientHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <ScrollToTop />
      <Header />
      <main style={{ paddingTop: headerHeight }} className="flex-1">
        <Suspense fallback={<div className="p-4 text-center">Loading page…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/muddyduck" element={<MuddyDuck />} />
            <Route path="/clevergirl" element={<CleverGirl />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/OnX" element={<OnX />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
