import React, { useState } from "react";
import { motion } from "framer-motion";
import RestaurantCard from "../RestaruentCard/RestaruentCard";
import { restaurants } from "../../data/Restaruents";
import { BiFilterAlt } from "react-icons/bi";

const NearbyRestaurant = () => {
  const [activeFilter, setActiveFilter] = useState("Relevance");

  const filters = [
    "Relevance",
    "Rating",
    "Delivery Time",
    "Cost: Low to High",
    "Cost: High to Low",
  ];

  return (
    <div className="px-4 py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-medium text-gray-900">
              Restaurants Near You
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {restaurants.length} restaurants around you
            </p>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            ))}
            <button className="p-2 bg-white rounded-full hover:bg-gray-100">
              <BiFilterAlt className="text-gray-700" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <RestaurantCard restaurant={restaurant} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NearbyRestaurant;
