import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const DishOrder = ({ isOpen, onClose, dish, quantity, onQuantityChange }) => {
  const [specialInstructions, setSpecialInstructions] = useState("");
  const navigate = useNavigate();

  const handleAddToCart = () => {
    // Add to cart logic here
    onClose();
    navigate("/cart");
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{dish.name}</h3>
                <p className="text-gray-600">{dish.description}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-lg">₹{dish.price}</span>
                <div className="flex items-center bg-food-yellow-500 rounded-lg overflow-hidden">
                  <button
                    onClick={() => onQuantityChange(quantity - 1)}
                    className="px-3 py-1 text-white hover:bg-food-yellow-600 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-white font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => onQuantityChange(quantity + 1)}
                    className="px-3 py-1 text-white hover:bg-food-yellow-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Add your cooking preferences, allergies, etc."
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-food-yellow-500 focus:border-transparent"
                  rows={3}
                />
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-food-yellow-500 text-black py-3 rounded-lg font-medium hover:bg-food-yellow-600 transition-colors"
            >
              Place Order - ₹{dish.price * quantity}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DishOrder;
