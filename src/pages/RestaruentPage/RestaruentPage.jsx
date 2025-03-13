import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { BiTime, BiSolidOffer } from "react-icons/bi";
import { HiCurrencyRupee } from "react-icons/hi";
import { restaurants } from "../../data/Restaruents";
import { dishes } from "../../data/Dishes";
import DishOrder from "../../componenet/DishOrder/DishOrder";

const RestaurantPage = () => {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === id);
  const restaurantDishes = dishes.filter((d) => d.restaurantId === id);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quantities, setQuantities] = useState({});
  const [selectedDish, setSelectedDish] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleIncrease = (dishId) => {
    setQuantities((prev) => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }));
  };
  const handleDishClick = (dish) => {
    setSelectedDish(dish);
    setIsOrderModalOpen(true);
  };

  const handleDecrease = (dishId) => {
    if (quantities[dishId] <= 1) {
      const newQuantities = { ...quantities };
      delete newQuantities[dishId];
      setQuantities(newQuantities);
    } else {
      setQuantities((prev) => ({
        ...prev,
        [dishId]: prev[dishId] - 1,
      }));
    }
  };
  const categories = [
    "All",
    ...new Set(restaurantDishes.map((d) => d.category)),
  ];

  const offers = [
    {
      code: "WELCOME50",
      discount: "50% OFF up to ₹100",
      description: "Valid on first order",
      maxDiscount: "100",
      validTill: "31 Dec",
      icon: "🎉",
    },

    {
      code: "SAVE20",
      discount: "20% OFF",
      description: "No minimum order value",
      maxDiscount: "120",
      validTill: "31 Dec",
      icon: "💰",
    },
    {
      code: "WEEKEND",
      discount: "Flat ₹150 OFF",
      description: "Valid on weekends",
      maxDiscount: "150",
      validTill: "31 Dec",
      icon: "🌟",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative h-[300px] lg:h-[400px]">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            {restaurant.name}
          </h1>
          <p className="text-white/80">{restaurant.cuisine.join(" • ")}</p>
          <p className="text-white/80">{restaurant.address}</p>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-2 px-3 py-2 bg-green-500 rounded text-white">
            <AiFillStar />
            <span className="font-medium">{restaurant.rating}</span>
          </div>
          <div className="flex items-center gap-2">
            <BiTime className="text-xl" />
            <span>{restaurant.deliveryTime} mins</span>
          </div>
          <div className="flex items-center gap-2">
            <HiCurrencyRupee className="text-xl" />
            <span>₹{restaurant.priceForTwo} for two</span>
          </div>
        </div>

        {/* Offers Section */}

        <div className="mb-4 bg-white rounded-lg p-3 shadow-sm">
          <h2 className="text-base font-bold mb-2 flex items-center gap-1">
            <BiSolidOffer className="text-food-yellow-500" />
            Offers
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {offers.map((offer, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="flex-shrink-0 w-48 p-2 border border-dashed border-food-yellow-500 rounded-lg bg-food-yellow-50 cursor-pointer"
              >
                <div className="flex items-start gap-2">
                  <span className="text-lg">{offer.icon}</span>
                  <div>
                    <p className="font-bold text-food-yellow-700 text-sm">
                      {offer.discount}
                    </p>
                    <p className="text-xs text-gray-600">{offer.description}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="px-1.5 py-0.5 bg-food-yellow-100 rounded text-[10px] font-medium">
                        {offer.code}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Categories Section */}
        <div className="sticky top-16 bg-white z-30 py-4 border-b mb-6">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileTap={{ scale: 0.95 }}
                className={`relative px-4 py-2 whitespace-nowrap text-base font-medium transition-colors ${
                  selectedCategory === category
                    ? "text-food-yellow-500"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {category}
                {selectedCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-food-yellow-500"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurantDishes
            .filter(
              (dish) =>
                selectedCategory === "All" || dish.category === selectedCategory
            )
            .map((dish) => (
              <motion.div
                key={dish.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                  {dish.isVeg ? (
                    <span className="absolute top-2 right-2 w-6 h-6 bg-white p-1 rounded">
                      <span className="block w-full h-full bg-green-500 rounded" />
                    </span>
                  ) : (
                    <span className="absolute top-2 right-2 w-6 h-6 bg-white p-1 rounded">
                      <span className="block w-full h-full bg-red-500 rounded" />
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{dish.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {dish.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">₹{dish.price}</span>
                    {quantities[dish.id] ? (
                      <div className="flex items-center bg-food-yellow-500 border-2  rounded-lg overflow-hidden">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDecrease(dish.id)}
                          className="px-3 py-1 text-black hover:bg-food-yellow-600 transition-colors"
                        >
                          -
                        </motion.button>
                        <span
                          className="px-3 py-1 text-black font-medium cursor-pointer"
                          onClick={() => handleDishClick(dish)}
                        >
                          {quantities[dish.id]}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            handleIncrease(dish.id);
                            handleDishClick(dish);
                          }}
                          className="px-3 py-1 text-black hover:bg-food-yellow-600 transition-colors"
                        >
                          +
                        </motion.button>
                      </div>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          handleIncrease(dish.id);
                          handleDishClick(dish);
                        }}
                        className="px-4 py-2 bg-food-yellow-500 text-black rounded-lg hover:bg-food-yellow-600 transition-colors"
                      >
                        Add
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
      {selectedDish && (
        <DishOrder
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          dish={selectedDish}
          quantity={quantities[selectedDish.id] || 1}
          onQuantityChange={(newQuantity) => {
            if (newQuantity < 1) {
              const newQuantities = { ...quantities };
              delete newQuantities[selectedDish.id];
              setQuantities(newQuantities);
              setIsOrderModalOpen(false);
            } else {
              setQuantities((prev) => ({
                ...prev,
                [selectedDish.id]: newQuantity,
              }));
            }
          }}
        />
      )}
    </div>
  );
};

export default RestaurantPage;
