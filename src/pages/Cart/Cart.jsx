import React from "react";
import { motion } from "framer-motion";
import { BiTime } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useCart } from "../../componenet/Context/CartContext";
import { restaurants } from "../../data/Restaruents";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, updateQuantity } = useCart();
  console.log("cart page - Items:", cartItems);

  const restaurant =
    cartItems.length > 0
      ? restaurants.find((r) => r.id === cartItems[0].restaurantId)
      : null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const platformFee = 20;
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + platformFee + taxes;

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate("/order-placed", {
      state: {
        total: total,
        restaurant: restaurant,
      },
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mt-2">
            Add items from a restaurant to start an order
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Restaurant Info */}
        {restaurant && (
          <Link to={`/restaurant/${restaurant.id}`}>
            <div className="bg-white rounded-xl p-4 mb-6 flex items-center gap-4 hover:shadow-md transition-shadow">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="font-medium text-gray-900">{restaurant.name}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <BiTime />
                  <span>{restaurant.deliveryTime} mins delivery</span>
                </div>
              </div>
            </div>
          </Link>
        )}

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
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-200"
                  >
                    -
                  </motion.button>
                  <span className="px-3 py-1">{item.quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-200"
                  >
                    +
                  </motion.button>
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
          onClick={handlePlaceOrder}
          className="w-full bg-red-500 text-white py-4 rounded-xl font-medium hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
        >
          Place Order • ₹{total}
        </motion.button>
      </div>
    </div>
  );
};

export default Cart;
