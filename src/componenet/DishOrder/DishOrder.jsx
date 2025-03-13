import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const DishOrder = ({ isOpen, onClose, dish, quantity, onQuantityChange }) => {
  const [specialInstructions, setSpecialInstructions] = useState("");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="bg-white w-full md:w-[480px] md:rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full"
              >
                <IoClose className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {dish.name}
                  </h3>
                  <p className="text-gray-500 mt-1">{dish.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={`w-4 h-4 ${
                      dish.isVeg ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {dish.isVeg ? "🟢" : "🔴"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <span className="text-2xl font-bold">
                  ₹{dish.price * quantity}
                </span>
                <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
                  <button
                    onClick={() => onQuantityChange(quantity - 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => onQuantityChange(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Any special instructions?"
                className="mt-6 w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                rows={3}
              />
              <a href="/cart ">
                <button
                  onClick={onClose}
                  className="mt-6 w-full bg-amber-500 text-white py-3 rounded-xl font-medium hover:bg-amber-600 transition-colors"
                >
                  Add to Cart - ₹{dish.price * quantity}
                </button>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DishOrder;
