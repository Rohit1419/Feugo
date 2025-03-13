import React from "react";
import { motion } from "framer-motion";
import DishCardSmall from "../DishCardSmall/DishCardSmall";
import { dishes } from "../../data/Dishes";

const DishSuggestion = () => {
  // Get first 16 dishes for recommendation (8 per row)
  const firstRow = dishes.slice(0, 8);
  const secondRow = dishes.slice(8, 16);

  return (
    <div className="px-4 lg:max-w-7xl lg:mx-auto bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg lg:text-xl font-bold text-brand-dark">
          Recommended for You
        </h3>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="text-sm lg:text-base text-food-yellow-500"
        >
          View All
        </motion.button>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="space-y-4 lg:space-y-6 w-max">
          {/* First Row */}
          <div className="flex gap-4 lg:gap-6">
            {firstRow.map((dish) => (
              <DishCardSmall
                key={dish.id}
                dish={dish}
                className="lg:w-64 lg:h-64"
              />
            ))}
          </div>
          {/* Second Row */}
          <div className="flex gap-4 lg:gap-6">
            {secondRow.map((dish) => (
              <DishCardSmall
                key={dish.id}
                dish={dish}
                className="lg:w-64 lg:h-64"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishSuggestion;
