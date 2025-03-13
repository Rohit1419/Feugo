import React from "react";
import { motion } from "framer-motion";
import RestaurantCard from "../RestaruentCard/RestaruentCard";
import { restaurants } from "../../data/Restaruents";

const NearbyRestaurant = () => {
  return (
    <div className="px-4 py-8 lg:max-w-7xl lg:mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl lg:text-2xl font-bold text-brand-dark">
          Restaurants Near You
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default NearbyRestaurant;
