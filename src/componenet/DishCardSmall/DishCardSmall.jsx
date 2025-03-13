import React from "react";
import { motion } from "framer-motion";
import { dishes } from "../../data/Dishes";

const DishCardSmall = ({ dish }) => {
  return (
    <motion.div className="w-32 flex-shrink-0" whileTap={{ scale: 0.95 }}>
      <div className="relative w-32 h-32 rounded-xl overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover"
        />
        {dish.isVeg ? (
          <span className="absolute top-2 right-2 w-4 h-4 bg-white p-0.5 rounded-sm">
            <span className="block w-full h-full bg-green-500 rounded-sm" />
          </span>
        ) : (
          <span className="absolute top-2 right-2 w-4 h-4 bg-white p-0.5 rounded-sm">
            <span className="block w-full h-full bg-red-500 rounded-sm" />
          </span>
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-medium text-brand-dark truncate">
          {dish.name}
        </h3>
        <p className="text-xs text-ui-muted truncate">₹{dish.price}</p>
      </div>
    </motion.div>
  );
};

export default DishCardSmall;
