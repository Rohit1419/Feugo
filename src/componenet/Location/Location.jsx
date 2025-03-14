import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiLocationMarker } from "react-icons/hi";
import { BiCurrentLocation } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

const OPENCAGE_API_KEY = "9e34abec847c4d849976e03295e04574";

const Location = ({ isOpen, onClose, onLocationSelect }) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(true);
  const [radius, setRadius] = useState(500); // Default radius 500m

  // Load saved location on component mount
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setCurrentLocation(JSON.parse(savedLocation));
      setShowLocationPicker(false);
    } else {
      setShowLocationPicker(true);
    }
  }, [isOpen]);

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
                radius: radius,
              };
              localStorage.setItem(
                "userLocation",
                JSON.stringify(locationData)
              );
              setCurrentLocation(locationData);
              onLocationSelect(locationData);
              setLoading(false);
              setShowLocationPicker(false);
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
      radius: radius,
    };

    localStorage.setItem("userLocation", JSON.stringify(locationData));
    setCurrentLocation(locationData);
    onLocationSelect(locationData);
    setSearchQuery("");
    setSearchResults([]);
    setShowLocationPicker(false);
  };

  const updateRadius = (newRadius) => {
    setRadius(newRadius);
    if (currentLocation) {
      const updatedLocation = { ...currentLocation, radius: newRadius };
      localStorage.setItem("userLocation", JSON.stringify(updatedLocation));
      setCurrentLocation(updatedLocation);
      onLocationSelect(updatedLocation);
    }
  };

  const resetLocationPicker = () => {
    setShowLocationPicker(true);
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
            <div className="relative bg-red-50 p-6">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 hover:bg-black/5 rounded-full"
              >
                <IoClose className="text-xl" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">
                {showLocationPicker ? "Set your location" : "Your location"}
              </h2>
              <p className="text-gray-500 mt-1">
                {showLocationPicker
                  ? "Get accurate pickup estimates"
                  : "Adjust pickup radius for better results"}
              </p>
            </div>

            {showLocationPicker ? (
              // Location Picker UI
              <div className="p-6 space-y-4">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={getCurrentLocation}
                  disabled={loading}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-red-200 bg-red-50 hover:bg-red-100 transition-colors duration-200"
                >
                  <div className="p-3 bg-white rounded-full">
                    <BiCurrentLocation
                      className={`text-2xl ${
                        loading ? "animate-spin text-red-700" : "text-red-500"
                      }`}
                    />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-medium text-gray-800">
                      {loading ? "Getting location..." : "Use current location"}
                    </p>
                    <p className="text-sm text-gray-500">
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
                    className="w-full p-4 pl-12 rounded-xl border-2 border-gray-100 focus:border-red-300 outline-none"
                  />
                  <HiLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
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
                        <HiLocationMarker className="text-xl text-red-500 mt-1" />
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
            ) : (
              // Location Management UI (after location is set)
              <div className="p-6 space-y-5">
                <div className="bg-red-50 p-4 rounded-xl">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-xl text-red-500 mt-1" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800">
                            Current Location
                          </p>
                          <p className="text-sm text-gray-500">
                            {currentLocation?.area}, {currentLocation?.city}
                          </p>
                        </div>
                        <button
                          onClick={resetLocationPicker}
                          className="p-2 hover:bg-red-100 rounded-full"
                        >
                          <MdEdit className="text-red-600" />
                        </button>
                      </div>
                      <p className="text-xs mt-1 text-gray-500">
                        {currentLocation?.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-800">Pickup Radius</p>

                    <p className="text-red-600 font-medium">
                      {currentLocation?.radius || radius}m
                    </p>
                  </div>
                  <input
                    type="range"
                    min="400"
                    max="2000"
                    step="200"
                    value={currentLocation?.radius || radius}
                    onChange={(e) => updateRadius(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>200m</span>
                    <span>1200m</span>
                    <span>2000m</span>
                  </div>
                </div>

                <div className="pt-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors"
                  >
                    Confirm
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Location;
