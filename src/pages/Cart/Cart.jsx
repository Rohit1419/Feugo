import React from "react";
import { motion } from "framer-motion";
import { BiTime } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";

const Cart = () => {
  // Example cart data - replace with your actual cart state
  const cartItems = [
    {
      id: 1,
      name: "Butter Chicken",
      price: 450,
      quantity: 2,
      isVeg: false,
      specialInstructions: "Extra butter",
    },
  ];

  const restaurantInfo = {
    name: "Taj Mahal Kitchen",
    deliveryTime: "30-35",
    image: "restaurant-image.jpg",
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 40;
  const platformFee = 20;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + platformFee + taxes;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Restaurant Info */}
        <div className="bg-white rounded-xl p-4 mb-6 flex items-center gap-4">
          <img
            src={restaurantInfo.image}
            alt={restaurantInfo.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h2 className="font-medium text-gray-900">{restaurantInfo.name}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <BiTime />
              <span>{restaurantInfo.deliveryTime} mins delivery</span>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <HiLocationMarker className="text-xl text-gray-400 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Delivery Address</h3>
              <p className="text-sm text-gray-600 mt-1">
                123 Main Street, Apartment 4B
              </p>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-xl p-4 mb-6">
          <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 border-b"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`w-4 h-4 ${
                    item.isVeg ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.isVeg ? "🟢" : "🔴"}
                </span>
                <div>
                  <h4 className="text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                  {item.specialInstructions && (
                    <p className="text-xs text-gray-400 mt-1">
                      {item.specialInstructions}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-100 rounded-lg">
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-200">
                    -
                  </button>
                  <span className="px-3 py-1">{item.quantity}</span>
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-200">
                    +
                  </button>
                </div>
                <span className="font-medium">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Details */}
        <div className="bg-white rounded-xl p-4 mb-6">
          <h3 className="font-medium text-gray-900 mb-4">Bill Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Item Total</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Taxes</span>
              <span>₹{taxes}</span>
            </div>
            <div className="flex justify-between pt-3 border-t font-medium text-base">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full bg-amber-500 text-white py-4 rounded-xl font-medium hover:bg-amber-600 transition-colors"
        >
          Place Order • ₹{total}
        </motion.button>
      </div>
    </div>
  );
};

export default Cart;
