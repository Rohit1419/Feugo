import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { dishes } from "../../data/Dishes";

const FloatingCart = ({ items, restaurant }) => {
  const totalItems = Object.values(items).reduce((sum, qty) => sum + qty, 0);
  const totalAmount = Object.entries(items).reduce((sum, [dishId, qty]) => {
    const dish = dishes.find((d) => d.id === dishId);
    return sum + (dish?.price || 0) * qty;
  }, 0);

  if (totalItems === 0) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg md:bottom-8 md:left-1/2 md:transform md:-translate-x-1/2 md:max-w-xl md:rounded-xl md:border"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600">
            {totalItems} items | ₹{totalAmount}
          </p>
          <p className="text-sm text-gray-500">from {restaurant.name}</p>
        </div>
        <Link
          to="/cart"
          className="bg-red-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
        >
          View Cart
        </Link>
      </div>
    </motion.div>
  );
};

export default FloatingCart;
