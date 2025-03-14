import React from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMapPin,
  FiCreditCard,
  FiHelpCircle,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiGift,
  FiStar,
  FiInfo,
} from "react-icons/fi";
import BottomNav from "../../componenet/BottomNav/BottomNav";

const Profile = () => {
  const menuItems = [
    {
      icon: FiMapPin,
      title: "Saved Addresses",
      subtitle: "Home, Work, etc.",
    },
    {
      icon: FiCreditCard,
      title: "Payment Methods",
      subtitle: "Add or manage payment methods",
    },
    {
      icon: FiGift,
      title: "Feugo Offers",
      subtitle: "Exclusive Mumbai deals and discounts",
      badge: "NEW",
    },
    {
      icon: FiStar,
      title: "Favorite Restaurants",
      subtitle: "Your top picks in Mumbai",
    },
    {
      icon: FiHelpCircle,
      title: "Help Center",
      subtitle: "FAQs and customer support",
    },
    {
      icon: FiSettings,
      title: "Settings",
      subtitle: "Preferences, notifications, etc.",
    },
    {
      icon: FiInfo,
      title: "About Feugo",
      subtitle: "Terms, Privacy, and more",
    },
    {
      icon: FiLogOut,
      title: "Logout",
      subtitle: "Sign out from your account",
      danger: true,
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-16 pb-24 md:pt-24 md:pb-12 px-4 md:px-8 max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-full flex items-center justify-center mr-4">
              <FiUser className="w-8 h-8 md:w-10 md:h-10 text-gray-500" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Raj Sharma</h1>
              <p className="text-gray-500">+91 98765 43210</p>
              <button className="text-sm text-red-500 mt-1 hover:text-red-600 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className={`bg-white p-4 rounded-lg shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow ${
                item.danger ? "hover:bg-red-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`p-2 rounded-full mr-3 ${
                    item.danger ? "bg-red-50" : "bg-gray-100"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      item.danger ? "text-red-500" : "text-gray-500"
                    }`}
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <h3
                      className={`font-medium ${
                        item.danger ? "text-red-500" : ""
                      }`}
                    >
                      {item.title}
                    </h3>
                    {item.badge && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{item.subtitle}</p>
                </div>
              </div>
              <FiChevronRight className="w-5 h-5 text-gray-400" />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Feugo Mumbai • App Version 1.0.0
          </p>
        </div>
      </motion.div>

      {/* Only show BottomNav on mobile */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </>
  );
};

export default Profile;
