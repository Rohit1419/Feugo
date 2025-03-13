import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiLocationMarker } from "react-icons/hi";
import { BiCurrentLocation } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const OPENCAGE_API_KEY = "9e34abec847c4d849976e03295e04574";

const Location = ({ isOpen, onClose, onLocationSelect }) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getCurrentLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              const result = data.results[0];
              const locationData = {
                address: result.formatted,
                city:
                  result.components.city || result.components.state_district,
                area:
                  result.components.suburb || result.components.neighbourhood,
                latitude,
                longitude,
              };
              localStorage.setItem(
                "userLocation",
                JSON.stringify(locationData)
              );
              onLocationSelect(locationData);
              setLoading(false);
              onClose();
            }
          } catch (error) {
            setLoading(false);
            console.error("Error fetching location:", error);
          }
        },
        (error) => {
          setLoading(false);
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const searchLocation = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            query
          )}&key=${OPENCAGE_API_KEY}&countrycode=in`
        );
        const data = await response.json();
        setSearchResults(data.results.slice(0, 5));
      } catch (error) {
        console.error("Error searching location:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleLocationSelect = (result) => {
    const locationData = {
      address: result.formatted,
      area:
        result.components.suburb ||
        result.components.neighbourhood ||
        result.components.district,
      city: result.components.city || result.components.state_district,
      fullLocation: `${
        result.components.suburb ||
        result.components.neighbourhood ||
        result.components.district
      }, ${result.components.city || result.components.state_district}`,
      latitude: result.geometry.lat,
      longitude: result.geometry.lng,
    };

    localStorage.setItem("userLocation", JSON.stringify(locationData));
    onLocationSelect(locationData);
    setSearchQuery("");
    setSearchResults([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl"
          >
            <div className="relative bg-food-yellow-50 p-6">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 hover:bg-black/5 rounded-full"
              >
                <IoClose className="text-xl" />
              </button>
              <h2 className="text-2xl font-bold text-brand-dark">
                Set your location
              </h2>
              <p className="text-ui-muted mt-1">
                Get accurate delivery estimates
              </p>
            </div>

            <div className="p-6 space-y-4">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={getCurrentLocation}
                disabled={loading}
                className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-food-yellow-100 bg-food-yellow-50 hover:bg-food-yellow-100 transition-colors duration-200"
              >
                <div className="p-3 bg-white rounded-full">
                  <BiCurrentLocation
                    className={`text-2xl ${
                      loading
                        ? "animate-spin text-food-yellow-700"
                        : "text-food-yellow-500"
                    }`}
                  />
                </div>
                <div className="text-left flex-1">
                  <p className="font-medium text-brand-dark">
                    {loading ? "Getting location..." : "Use current location"}
                  </p>
                  <p className="text-sm text-ui-muted">
                    Get location automatically
                  </p>
                </div>
              </motion.button>

              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => searchLocation(e.target.value)}
                  placeholder="Search for area, street name..."
                  className="w-full p-4 pl-12 rounded-xl border-2 border-gray-100 focus:border-food-yellow-300 outline-none"
                />
                <HiLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-ui-muted" />
              </div>

              {searchResults.length > 0 && (
                <div className="mt-2 max-h-60 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 hover:bg-gray-50 cursor-pointer flex items-start gap-3"
                      onClick={() => handleLocationSelect(result)}
                    >
                      <HiLocationMarker className="text-xl text-food-yellow-500 mt-1" />
                      <div>
                        <p className="font-medium">{result.formatted}</p>
                        <p className="text-sm text-gray-500">
                          {result.components.suburb ||
                            result.components.neighbourhood}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Location;
