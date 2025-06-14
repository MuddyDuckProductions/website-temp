import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

// Lazy load page components
const Home = lazy(() => import("./Home"));
const MuddyDuck = lazy(() => import("./MuddyDuck"));
const CleverGirl = lazy(() => import("./CleverGirl"));
const Calendar = lazy(() => import("./Calendar"));
const OnX = lazy(() => import("./OnX"));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <ScrollToTop />
      <Header />
      <Suspense fallback={<div className="p-4 text-center">Loading page…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/muddyduck" element={<MuddyDuck />} />
          <Route path="/clevergirl" element={<CleverGirl />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/OnX" element={<OnX />} />
          
          {/* Redirect old paths to new ones */}
          {/* Catch-all route to redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
