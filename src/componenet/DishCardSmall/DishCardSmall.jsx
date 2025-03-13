import React from "react";
import { motion } from "framer-motion";

const DishCardSmall = ({ dish }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {dish.isVeg && (
          <span className="absolute top-2 right-2 w-6 h-6 bg-white p-1 rounded">
            <span className="block w-full h-full bg-green-500 rounded" />
          </span>
        )}
      </div>

      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {dish.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-600">₹{dish.price}</span>
          <span className="h-1 w-1 bg-gray-300 rounded-full" />
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-gray-700">
              {dish.rating}
            </span>
            <span className="text-amber-400">★</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1 truncate">
          {dish.description}
        </p>
      </div>
    </div>
  );
};

export default DishCardSmall;
