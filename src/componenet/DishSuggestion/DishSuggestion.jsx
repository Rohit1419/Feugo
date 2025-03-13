import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import DishCardSmall from "../DishCardSmall/DishCardSmall";
import { dishes } from "../../data/Dishes";

const DishSuggestion = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Veg Only", "Non-veg", "Bestsellers"];

  const filteredDishes = useMemo(() => {
    const initialDishes = dishes.slice(0, 8);
    switch (activeFilter) {
      case "Veg Only":
        return initialDishes.filter((dish) => dish.isVeg);
      case "Non-veg":
        return initialDishes.filter((dish) => !dish.isVeg);
      case "Bestsellers":
        return initialDishes.filter((dish) => dish.bestSeller);
      default:
        return initialDishes;
    }
  }, [activeFilter]);

  return (
    <div className="px-4 py-8 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-gray-800">
            Popular Dishes Near You
          </h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="text-sm text-amber-500 hover:text-amber-600"
          >
            See all
          </motion.button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredDishes.map((dish) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <DishCardSmall dish={dish} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DishSuggestion;
