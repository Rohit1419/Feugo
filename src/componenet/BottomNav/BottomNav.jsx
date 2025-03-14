import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHome,
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiHeart,
} from "react-icons/fi";
import { AiFillHome, AiFillHeart } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { BsFillBagFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: FiHome,
      activeIcon: AiFillHome,
      action: () => navigate("/"),
    },
    {
      name: "Search",
      path: "/search",
      icon: FiSearch,
      activeIcon: BiSearchAlt,
      action: () => {
        // Focus the main search input instead of creating a new search panel
        const searchInput = document.getElementById("main-search-input");
        if (searchInput) {
          searchInput.focus();
          // Scroll to top to make search visible if needed
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          navigate("/");
          // Wait for navigation and then try to focus
          setTimeout(() => {
            const input = document.getElementById("main-search-input");
            if (input) input.focus();
          }, 100);
        }
      },
    },
    {
      name: "Orders",
      path: "/orders",
      icon: FiShoppingBag,
      activeIcon: BsFillBagFill,
      action: () => navigate("/orders"),
    },
    {
      name: "Favorites",
      path: "/favorites",
      icon: FiHeart,
      activeIcon: AiFillHeart,
      action: () => console.log("Favorites clicked - no action for now"),
    },
    {
      name: "Profile",
      path: "/profile",
      icon: FiUser,
      activeIcon: FaUser,
      action: () => navigate("/profile"),
    },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white shadow-lg md:hidden"
    >
      <div className="flex justify-between items-center h-16 px-4">
        {navItems.map((item) => {
          const isActive = path === item.path;
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <button
              key={item.name}
              onClick={item.action}
              className="flex flex-col items-center justify-center w-1/5 h-full relative"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="flex flex-col items-center justify-center"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 w-8 h-1 rounded-full bg-red-500"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}

                <motion.div
                  animate={{
                    y: isActive ? -2 : 0,
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={isActive ? "text-red-500" : "text-gray-500"}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>

                <motion.span
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    y: isActive ? 1 : 0,
                  }}
                  className={`text-xs mt-1 ${
                    isActive ? "text-red-500 font-medium" : "text-gray-500"
                  }`}
                >
                  {item.name}
                </motion.span>

                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -z-10 w-12 h-12 rounded-full bg-red-50 opacity-70"
                  />
                )}
              </motion.div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomNav;
