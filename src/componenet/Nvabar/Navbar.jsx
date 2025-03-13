import React, { useState, useEffect } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { RiUserLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { FiTrendingUp } from "react-icons/fi";
import Location from "../Location/Location";

const Navbar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [placeholder, setPlaceholder] = useState(
    "Search for restaurants and food"
  );

  const placeholders = [
    "Craving pizza? Find the best ones here",
    "Hungry? Order your favorite biryani",
    "Search for your comfort food",
    "Discover top-rated restaurants near you",
    "Find the best deals and offers",
    "Order breakfast, lunch, or dinner",
    "Explore new cuisines around you",
    "Late night cravings? We got you covered",
  ];

  const trendingSearches = [
    {
      text: "Best Biryani Places",
      tag: "Trending",
      icon: "🔥",
    },
    {
      text: "Pizza Offers",
      tag: "40% OFF",
      icon: "🍕",
    },
    {
      text: "Healthy Breakfast",
      tag: "New",
      icon: "🥗",
    },
    {
      text: "Late Night Delivery",
      tag: "24x7",
      icon: "🌙",
    },
    {
      text: "Premium Restaurants",
      tag: "Featured",
      icon: "⭐",
    },
  ];

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setCurrentLocation(JSON.parse(savedLocation));
    }
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

  const handleLocationSelect = (location) => {
    setCurrentLocation(location);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/50 to-transparent safe-top">
      <div className="pt-safe-top" />

      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
          {/* Logo and Location Row */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            {/* Logo */}
            <div className="hidden lg:block">
              <h1 className="text-2xl font-bold text-white">Feugo</h1>
            </div>

            {/* Location Selector */}
            <div
              className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => setShowLocation(true)}
            >
              <HiLocationMarker className="text-xl text-food-red" />
              <div className="flex flex-col">
                <span className="text-xs text-white/70">Delivery to</span>
                <div className="flex items-center gap-1 group">
                  <span className="text-sm lg:text-base font-medium text-white truncate max-w-[150px]">
                    {currentLocation
                      ? currentLocation.area || currentLocation.city
                      : "Select Location"}
                  </span>

                  <IoIosArrowDown className="text-white text-sm group-hover:rotate-180 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* Mobile User Icon */}
            <div className="lg:hidden w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors duration-300">
              <RiUserLine className="text-white text-xl" />
            </div>
          </div>

          {/* Search and Navigation Row */}
          <div className="  flex-1 mt-3 lg:mt-0 lg:flex lg:items-center lg:gap-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={placeholder}
                className="w-full py-2.5 lg:py-3 px-4 pl-10 bg-white rounded-lg text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-food-yellow-500 transition-all duration-300 shadow-sm hover:shadow-md"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              />
              <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ui-muted text-lg" />

              {/* Search Suggestions */}
              {isFocused && (
                <div className="absolute w-full bg-white mt-2 rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-fade-in z-50">
                  <div className="p-3 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-food-yellow-500 mb-2">
                      <FiTrendingUp className="text-lg" />
                      <span className="text-sm font-medium">
                        Popular Searches
                      </span>
                    </div>
                    {trendingSearches.map((search, index) => (
                      <div
                        key={index}
                        className="py-2 px-3 hover:bg-food-yellow-50 cursor-pointer rounded-md transition-colors duration-200 animate-slide-in flex items-center justify-between"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center gap-2">
                          <span>{search.icon}</span>
                          <span className="text-sm text-gray-700">
                            {search.text}
                          </span>
                        </div>
                        <span className="text-xs px-2 py-1 bg-food-yellow-100 text-food-yellow-700 rounded-full">
                          {search.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <button className="text-white hover:text-food-yellow-500 transition-colors">
                Offers
              </button>
              <button className="text-white hover:text-food-yellow-500 transition-colors">
                Help
              </button>
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors duration-300">
                <RiUserLine className="text-white text-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Location
        isOpen={showLocation}
        onClose={() => setShowLocation(false)}
        onLocationSelect={handleLocationSelect}
      />
    </nav>
  );
};

export default Navbar;
