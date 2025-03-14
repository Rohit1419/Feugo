import React, { useState } from "react";
import { useCart } from "../../componenet/Context/CartContext";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { HiCurrencyRupee } from "react-icons/hi";
import { restaurants } from "../../data/Restaruents";
import { dishes } from "../../data/Dishes";
import DishOrder from "../../componenet/DishOrder/DishOrder";
import FloatingCart from "../../componenet/GoToCart/GoToCart";

const RestaurantPage = () => {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === id);
  const restaurantDishes = dishes.filter((d) => d.restaurantId === id);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDish, setSelectedDish] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();
  console.log("Cart context:", useCart());

  const handleAddToCart = (dish, quantity, specialInstructions) => {
    console.log("Adding to cart:", dish, quantity, specialInstructions);

    if (quantity > 0) {
      const dishWithRestaurant = {
        ...dish,
        restaurantId: id,
      };
      addToCart(dishWithRestaurant, quantity, specialInstructions);
      setIsOrderModalOpen(false);
    }
  };

  const categories = [
    "All",
    ...new Set(restaurantDishes.map((d) => d.category)),
  ];

  const updateQuantity = (dishId, newQuantity) => {
    setQuantities((prev) => ({
      ...prev,
      [dishId]: Math.max(0, newQuantity),
    }));
  };

  const renderQuantityControl = (dish) => {
    const quantity = quantities[dish.id] || 0;

    if (quantity === 0) {
      return (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            updateQuantity(dish.id, 1);
          }}
          className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all"
        >
          Add
        </motion.button>
      );
    }

    return (
      <div className="flex items-center bg-red-50 rounded-lg border border-red-100">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            updateQuantity(dish.id, quantity - 1);
          }}
          className="px-4 py-2 text-red-500 hover:bg-red-100 transition-all"
        >
          -
        </motion.button>
        <span className="px-4 py-2 font-medium text-gray-900">{quantity}</span>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            updateQuantity(dish.id, quantity + 1);
          }}
          className="px-4 py-2 text-red-500 hover:bg-red-100 transition-all"
        >
          +
        </motion.button>
      </div>
    );
  };

  if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {restaurant.name}
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              {restaurant.cuisine.join(" • ")}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500 rounded-lg">
                <AiFillStar className="text-white" />
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
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="sticky top-16 bg-white z-30 -mx-4 px-4 py-4 shadow-sm">
          <div className="flex gap-4 overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {restaurantDishes
            .filter(
              (dish) =>
                selectedCategory === "All" || dish.category === selectedCategory
            )
            .map((dish) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setSelectedDish(dish);
                  setIsOrderModalOpen(true);
                }}
              >
                <div className="relative aspect-video">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          dish.isVeg ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span className="text-xs font-medium text-gray-700">
                        {dish.isVeg ? "Veg" : "Non-veg"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{dish.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">₹{dish.price}</span>
                    </div>
                    {renderQuantityControl(dish)}
                  </div>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {dish.description}
                  </p>
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
          quantity={quantities[selectedDish.id] || 0}
          onQuantityChange={(newQuantity) =>
            updateQuantity(selectedDish.id, newQuantity)
          }
          onAddToCart={handleAddToCart}
        />
      )}

      <FloatingCart items={quantities} restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPage;
