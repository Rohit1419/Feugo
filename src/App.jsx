import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./componenet/Context/CartContext";
import Navbar from "./componenet/Nvabar/Navbar";
import Home from "./pages/Home";
import LocationModal from "./componenet/Location/Location";
import RestaruentPage from "./pages/RestaruentPage/RestaruentPage";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import Orders from "./pages/Orders/Orders";
import OrderPlaced from "./pages/OrderPlaced/OrderPlaced";

function App() {
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    const hasLocation = localStorage.getItem("userLocation");
    if (!hasLocation) {
      setShowLocation(true);
    }
  }, []);

  return (
    <CartProvider>
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
            <Route path="/order-placed" element={<OrderPlaced />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
