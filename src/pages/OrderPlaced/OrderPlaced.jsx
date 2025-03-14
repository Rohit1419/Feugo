import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FiCheck, FiClock, FiMapPin } from "react-icons/fi";
import { useCart } from "../../componenet/Context/CartContext";
import { restaurants } from "../../data/Restaruents";

const OrderPlaced = () => {
  const { cartItems, clearCart } = useCart();
  const location = useLocation();
  const { total, restaurant } = location.state || {};

  const orderDetails = {
    orderId: "ORDER" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    restaurant: restaurant?.name,
    deliveryTime: restaurant?.deliveryTime,
    totalAmount: total,
    deliveryAddress: restaurant?.address,
    items: cartItems,
  };

  React.useEffect(() => {
    return () => clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center"
          >
            <FiCheck className="text-white text-4xl" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mt-6 text-gray-900"
          >
            Order Placed Successfully!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            Order ID: {orderDetails.orderId}
          </motion.p>
        </div>

        {/* Coins Earned Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8 bg-amber-50 rounded-xl p-6 border border-amber-100"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-16 h-16  rounded-full mx-auto flex items-center justify-center mb-4"
          >
            <span className="text-6xl">🪙</span>
          </motion.div>

          <h2 className="text-xl font-semibold text-amber-700">
            Congratulations! You earned{" "}
            {Math.floor(orderDetails.totalAmount / 50)} F-Coins
          </h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-amber-600 mt-2"
          >
            Keep ordering to earn more coins and unlock exclusive rewards!
          </motion.p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          {/* Restaurant Info */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              {orderDetails.restaurant}
            </h2>
            <div className="flex items-center gap-4 mt-4 text-gray-600">
              <div className="flex items-center gap-2">
                <FiClock />
                <span>{orderDetails.deliveryTime} mins</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin />
                <span className="text-sm">{orderDetails.deliveryAddress}</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-6 border-b">
            <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
            {orderDetails.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">{item.quantity}x</span>
                  <span className="text-gray-900">{item.name}</span>
                </div>
                <span className="text-gray-900">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Total Amount */}
          <div className="p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Total Amount</span>
              <span className="font-bold text-gray-900">
                ₹{orderDetails.totalAmount}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          <Link to="/orders">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full bg-red-500 text-white py-4 rounded-xl font-medium hover:bg-red-600 transition-colors"
            >
              Track Order
            </motion.button>
          </Link>
          <Link to="/">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gray-100 text-gray-900 py-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Order More Food
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
