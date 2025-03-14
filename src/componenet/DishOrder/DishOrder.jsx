import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const DishOrder = ({
  isOpen,
  onClose,
  dish,
  quantity,
  onQuantityChange,
  onAddToCart,
}) => {
  const [specialInstructions, setSpecialInstructions] = useState("");

  const handleAddToCart = () => {
    onAddToCart(dish, quantity, specialInstructions);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center p-4 md:p-0"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white w-full md:w-[560px] md:rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
              >
                <IoClose className="w-6 h-6 text-gray-700" />
              </button>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      dish.isVeg ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {dish.isVeg ? "Veg" : "Non-veg"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-gray-600">{dish.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-bold text-gray-900">
                  ₹{dish.price * (quantity || 1)}
                </div>
                <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onQuantityChange(quantity - 1)}
                    className="px-5 py-3 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    -
                  </motion.button>
                  <span className="px-6 py-3 font-medium text-lg">
                    {quantity || "Add"}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onQuantityChange(quantity + 1)}
                    className="px-5 py-3 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    +
                  </motion.button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Special Instructions
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Add your special instructions here..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  rows={3}
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="mt-6 w-full bg-red-500 text-white py-4 rounded-xl font-medium hover:bg-red-600 transition-colors text-lg shadow-lg shadow-red-500/20"
              >
                Add to Cart - ₹{dish.price * quantity}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DishOrder;
