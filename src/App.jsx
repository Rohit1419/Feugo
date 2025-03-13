import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componenet/Nvabar/Navbar";
import Home from "./pages/Home";
import LocationModal from "./componenet/Location/Location";
import RestaruentPage from "./pages/RestaruentPage/RestaruentPage";
import Cart from "./pages/Cart/Cart";

function App() {
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    const hasLocation = localStorage.getItem("userLocation");
    if (!hasLocation) {
      setShowLocation(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-ui-background">
        {showLocation && (
          <LocationModal
            isOpen={showLocation}
            onClose={() => setShowLocation(false)}
          />
        )}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaruentPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
