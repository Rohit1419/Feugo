import React from "react";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { MdLocalOffer } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
    >
      <div className="relative">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />

          {/* Delivery Time */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg">
            <div className="flex items-center gap-1.5">
              <BiTime className="text-gray-600" />
              <span className="text-xs font-medium text-gray-700">
                {restaurant.deliveryTime} min
              </span>
            </div>
          </div>

          {/* Promoted Tag */}
          {restaurant.promoted && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium px-2 py-1 rounded-lg">
              Promoted
            </div>
          )}

          {/* Discount/Offer Tag */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-2 text-white">
              <MdLocalOffer className="text-amber-400" />
              <span className="text-sm font-medium">50% OFF up to ₹100</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-gray-900 font-medium truncate">
                {restaurant.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded">
                  <span className="text-xs font-semibold text-green-700">
                    {restaurant.rating}
                  </span>
                  <AiFillStar className="text-xs text-green-700" />
                </div>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">
                  {restaurant.deliveryTime} mins
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <p className="text-sm text-gray-500 truncate">
              {restaurant.cuisine.join(" • ")}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              ₹{restaurant.priceForTwo} for two
            </p>
          </div>

          {/* Quick View on Hover */}
          <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-12 bg-gradient-to-t from-black/80 to-black/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="text-white text-sm font-medium">Quick View</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;
