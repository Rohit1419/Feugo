import React, { useState, useEffect } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { RiUserLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { FiTrendingUp } from "react-icons/fi";
import Location from "../Location/Location";
import tailwindConfig from "../../../tailwind.config";

const Navbar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
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
    { text: "Best Biryani Places", tag: "Trending", icon: "🔥" },
    { text: "Pizza Offers", tag: "40% OFF", icon: "🍕" },
    { text: "Healthy Breakfast", tag: "New", icon: "🥗" },
    { text: "Late Night Delivery", tag: "24x7", icon: "🌙" },
    { text: "Premium Restaurants", tag: "Featured", icon: "⭐" },
  ];

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background-light/80 bg-white shadow-sm py-2"
          : "bg-gradient-to-b from-neutral-900/50 to-transparent py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
          <div className="flex items-center justify-between w-full lg:w-auto">
            <div className="hidden lg:block mx-6">
              <h1
                className={`text-4xl font-bold animate-fade-in ${
                  isScrolled ? "text-neutral-800" : "text-white"
                }`}
              >
                Feugo
              </h1>
            </div>

            <div
              className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => setShowLocation(true)}
            >
              <HiLocationMarker className="text-xl text-secondary-500" />
              <div className="flex flex-col">
                <span
                  className={`text-xs ${
                    isScrolled ? "text-neutral-500" : "text-white/70"
                  }`}
                >
                  Delivery to
                </span>
                <div className="flex items-center gap-1 group">
                  <span
                    className={`text-sm lg:text-base font-medium truncate max-w-[150px] ${
                      isScrolled ? "text-neutral-800" : "text-white"
                    }`}
                  >
                    {currentLocation
                      ? currentLocation.area || currentLocation.city
                      : "Select Location"}
                  </span>
                  <IoIosArrowDown
                    className={`text-sm group-hover:rotate-180 transition-transform duration-300 ${
                      isScrolled ? "text-neutral-800" : "text-white"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div
              className={`lg:hidden w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                isScrolled
                  ? "bg-neutral-100 hover:bg-neutral-200"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <RiUserLine
                className={isScrolled ? "text-neutral-700" : "text-white"}
              />
            </div>
          </div>

          <div className="flex-1 mt-2 lg:mt-0 lg:flex lg:items-center lg:gap-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={placeholder}
                className="w-full py-2 lg:py-2.5 px-4 pl-10 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 shadow-sm hover:shadow-md"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              />
              <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <button
                className={`font-medium transition-colors ${
                  isScrolled
                    ? "text-neutral-700 hover:text-primary-500"
                    : "text-white hover:text-primary-300"
                }`}
              >
                Offers
              </button>
              <button
                className={`font-medium transition-colors ${
                  isScrolled
                    ? "text-neutral-700 hover:text-primary-500"
                    : "text-white hover:text-primary-300"
                }`}
              >
                Help
              </button>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                  isScrolled
                    ? "bg-neutral-100 hover:bg-neutral-200"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <RiUserLine
                  className={isScrolled ? "text-neutral-700" : "text-white"}
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
