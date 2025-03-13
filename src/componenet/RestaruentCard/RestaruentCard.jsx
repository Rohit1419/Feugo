import React from "react";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="w-full max-w-sm bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-brand-dark">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white rounded">
            <AiFillStar />
            <span>{restaurant.rating}</span>
          </div>
        </div>

        <p className="text-ui-muted text-sm mb-2">
          {restaurant.cuisine.join(" • ")}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-brand-dark">
            ₹{restaurant.priceForTwo} for two
          </span>
          <div className="flex items-center gap-1 text-ui-muted">
            <BiTime />
            <span>{restaurant.deliveryTime} mins</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;
