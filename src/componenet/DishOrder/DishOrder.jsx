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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25 }}
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
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full"
              >
                <IoClose className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">{dish.name}</h3>
              <p className="text-gray-500 mt-1">{dish.description}</p>

              <div className="flex items-center justify-between mt-6">
                <span className="text-2xl font-bold">
                  ₹{dish.price * quantity}
                </span>
                <div className="flex items-center bg-gray-100 rounded-lg">
                  <button
                    onClick={() => onQuantityChange(quantity - 1)}
                    className="px-4 py-2 text-gray-600"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => onQuantityChange(quantity + 1)}
                    className="px-4 py-2 text-gray-600"
                  >
                    +
                  </button>
                </div>
              </div>

              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Any special instructions?"
                className="mt-6 w-full px-4 py-3 rounded-xl bg-gray-100"
                rows={3}
              />

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => onAddToCart(dish, quantity, specialInstructions)}
                className="mt-6 w-full bg-red-500 text-white py-4 rounded-xl font-medium"
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
