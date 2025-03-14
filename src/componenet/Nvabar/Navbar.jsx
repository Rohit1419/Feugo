import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiLocationMarker } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { RiUserLine } from "react-icons/ri";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { FiClock, FiTrendingUp } from "react-icons/fi";

import Location from "../Location/Location";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "Search for restaurants and food"
  );
  const searchRef = useRef(null);

  const placeholders = [
    "Craving pizza? Find pickup options nearby",
    "Hungry? Order ahead and skip the line",
    "Search for your comfort food to go",
    "Discover top-rated takeaway spots near you",
    "Find the best deals on pickup orders",
    "Order breakfast, lunch, or dinner for pickup",
    "Explore new cuisines for takeaway",
    "Late night cravings? Find open restaurants",
  ];

  const trendingSearches = [
    { text: "Best Vada Pav in Mumbai", tag: "Trending", icon: "🔥" },
    { text: "Pizza Offers", tag: "40% OFF", icon: "🍕" },
    { text: "Healthy Breakfast", tag: "New", icon: "🥗" },
    { text: "Late Night Pickup", tag: "24x7", icon: "🌙" },
    { text: "Premium Restaurants", tag: "Featured", icon: "⭐" },
  ];

  const recentSearches = ["Biryani", "South Indian", "Chinese", "Desserts"];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) setCurrentLocation(JSON.parse(savedLocation));
  }, []);

  useEffect(() => {
    if (!isFocused) {
      const interval = setInterval(() => {
        setPlaceholder(
          placeholders[Math.floor(Math.random() * placeholders.length)]
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isFocused]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Only show navbar on homepage for mobile
  const isHomePage = location.pathname === "/";
  const showOnMobile = isHomePage ? "" : "hidden md:block";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${showOnMobile} ${
        isScrolled || isFocused
          ? "bg-white shadow-sm py-2"
          : "bg-gradient-to-b from-neutral-900/50 to-transparent py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
          <div className="flex items-center justify-between w-full lg:w-auto">
            <div className="hidden lg:block mx-6">
              <a href="/">
                <h1
                  className={`text-4xl font-bold animate-fade-in ${
                    isScrolled || isFocused ? "text-red-600" : "text-white"
                  }`}
                >
                  Feugo
                </h1>
              </a>
            </div>

            <div
              className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => setShowLocation(true)}
            >
              <HiLocationMarker className="text-xl text-red-500" />
              <div className="flex flex-col">
                <span
                  className={`text-xs ${
                    isScrolled || isFocused
                      ? "text-neutral-500"
                      : "text-white/70"
                  }`}
                >
                  Pickup from
                </span>
                <div className="flex items-center gap-1 group">
                  <span
                    className={`text-sm lg:text-base font-medium truncate max-w-[150px] ${
                      isScrolled || isFocused
                        ? "text-neutral-800"
                        : "text-white"
                    }`}
                  >
                    {currentLocation
                      ? currentLocation.area || currentLocation.city
                      : "Select Location"}
                  </span>
                  <IoIosArrowDown
                    className={`text-sm group-hover:rotate-180 transition-transform duration-300 ${
                      isScrolled || isFocused
                        ? "text-neutral-800"
                        : "text-white"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div
              className={`lg:hidden w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                isScrolled || isFocused
                  ? "bg-neutral-100 hover:bg-neutral-200"
                  : "bg-white/10 hover:bg-white/20"
              }`}
              onClick={() => navigate("/profile")}
            >
              <RiUserLine
                className={
                  isScrolled || isFocused ? "text-neutral-700" : "text-white"
                }
              />
            </div>
          </div>

          <div
            className="flex-1 mt-2 lg:mt-0 lg:flex lg:items-center lg:gap-6"
            ref={searchRef}
          >
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 lg:py-2.5 px-4 pl-10 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 shadow-sm hover:shadow-md"
                onFocus={() => setIsFocused(true)}
                id="main-search-input"
              />
              <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  onClick={() => setSearchQuery("")}
                >
                  <IoMdClose />
                </button>
              )}

              {/* Trending Searches Dropdown */}
              <AnimatePresence>
                {isFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    <div className="max-h-[70vh] overflow-y-auto">
                      {/* Recent Searches */}
                      {recentSearches.length > 0 && (
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-500 flex items-center">
                              <FiClock className="mr-2" /> RECENT SEARCHES
                            </h3>
                            <button className="text-xs text-red-500 hover:text-red-600">
                              Clear All
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {recentSearches.map((search, index) => (
                              <button
                                key={index}
                                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                              >
                                {search}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Trending Searches */}
                      <div className="p-4 border-t border-gray-100">
                        <h3 className="text-sm font-medium text-gray-500 flex items-center mb-3">
                          <FiTrendingUp className="mr-2" /> TRENDING IN MUMBAI
                        </h3>
                        <div className="space-y-3">
                          {trendingSearches.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                            >
                              <div className="w-8 h-8 flex items-center justify-center mr-3 text-lg">
                                {item.icon}
                              </div>
                              <div className="flex-1">
                                <p className="text-gray-800">{item.text}</p>
                              </div>
                              <div className="ml-2">
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full ${
                                    item.tag === "Trending"
                                      ? "bg-orange-100 text-orange-800"
                                      : item.tag === "40% OFF"
                                      ? "bg-green-100 text-green-800"
                                      : item.tag === "New"
                                      ? "bg-blue-100 text-blue-800"
                                      : item.tag === "24x7"
                                      ? "bg-purple-100 text-purple-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {item.tag}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Popular Categories */}
                      <div className="p-4 border-t border-gray-100">
                        <h3 className="text-sm font-medium text-gray-500 mb-3">
                          POPULAR CATEGORIES
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {[
                            "Breakfast",
                            "Lunch",
                            "Dinner",
                            "Snacks",
                            "Desserts",
                            "Beverages",
                          ].map((category, index) => (
                            <button
                              key={index}
                              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-left transition-colors"
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <button
                className={`font-medium transition-colors ${
                  isScrolled || isFocused
                    ? "text-neutral-700 hover:text-red-500"
                    : "text-white hover:text-red-300"
                }`}
              >
                Offers
              </button>
              <button
                className={`font-medium transition-colors ${
                  isScrolled || isFocused
                    ? "text-neutral-700 hover:text-red-500"
                    : "text-white hover:text-red-300"
                }`}
              >
                Help
              </button>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                  isScrolled || isFocused
                    ? "bg-neutral-100 hover:bg-neutral-200"
                    : "bg-white/10 hover:bg-white/20"
                }`}
                onClick={() => navigate("/profile")}
              >
                <RiUserLine
                  className={
                    isScrolled || isFocused ? "text-neutral-700" : "text-white"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Location
        isOpen={showLocation}
        onClose={() => setShowLocation(false)}
        onLocationSelect={(location) => setCurrentLocation(location)}
      />
    </nav>
  );
};

export default Navbar;
