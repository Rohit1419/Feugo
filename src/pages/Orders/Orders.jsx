import React from "react";
import { motion } from "framer-motion";
import { FiPackage, FiClock, FiCheckCircle } from "react-icons/fi";
import BottomNav from "../../componenet/BottomNav/BottomNav";

const Orders = () => {
  const orders = [
    {
      id: "ORD123456",
      restaurant: "Bombay Brasserie",
      items: ["Butter Chicken", "Garlic Naan"],
      total: "₹450",
      date: "12 Jun, 2023",
      status: "Ready for pickup",
      icon: FiCheckCircle,
      pickupTime: "Today, 6:30 PM",
      location: "Andheri West",
    },
    {
      id: "ORD789012",
      restaurant: "Mumbai Vada Pav Co.",
      items: ["Vada Pav (2)", "Masala Chai"],
      total: "₹120",
      date: "5 Jun, 2023",
      status: "Picked up",
      icon: FiCheckCircle,
      pickupTime: "Jun 5, 5:45 PM",
      location: "Dadar",
    },
    {
      id: "ORD345678",
      restaurant: "South Mumbai Dosa",
      items: ["Mysore Masala Dosa", "Filter Coffee"],
      total: "₹210",
      date: "28 May, 2023",
      status: "Picked up",
      icon: FiCheckCircle,
      pickupTime: "May 28, 1:15 PM",
      location: "Colaba",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-16 pb-24 md:pt-24 md:pb-12 px-4 md:px-8 max-w-6xl mx-auto"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Orders</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-4 md:p-5 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-base md:text-lg">
                    {order.restaurant}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {order.date} • {order.location}
                  </p>
                </div>
                <div
                  className={`flex items-center ${
                    order.status === "Ready for pickup"
                      ? "text-orange-500"
                      : "text-green-500"
                  }`}
                >
                  <order.icon className="w-4 h-4 mr-1" />
                  <span className="text-sm">{order.status}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 mt-2">
                <p className="text-sm text-gray-700 mb-2">
                  {order.items.join(", ")}
                </p>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <span className="text-sm font-medium">{order.total}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      • Pickup: {order.pickupTime}
                    </span>
                  </div>
                  <button className="text-sm text-white bg-red-500 hover:bg-red-600 transition-colors py-1.5 px-3 rounded-md md:self-end">
                    Reorder
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20">
            <FiPackage className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-700">No orders yet</h2>
            <p className="text-gray-500 text-center mt-2 max-w-md">
              When you place your first order from Mumbai's best restaurants, it
              will appear here
            </p>
            <button className="mt-6 bg-red-500 hover:bg-red-600 transition-colors text-white py-3 px-6 rounded-full font-medium">
              Browse Restaurants
            </button>
          </div>
        )}
      </motion.div>
      Only show BottomNav on mobile
      <div className="md:hidden">
        <BottomNav />
      </div>
    </>
  );
};

export default Orders;
