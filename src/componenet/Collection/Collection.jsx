import React from "react";
import { motion } from "framer-motion";
import biryani from "../../assets/collection/biryani.avif";
import burger from "../../assets/collection/burger.avif";
import pizza from "../../assets/collection/pizza.avif";
import Rolls from "../../assets/collection/Rolls.avif";
import cake from "../../assets/collection/cake.avif";
import momo from "../../assets/collection/momo.avif";
import sandwhich from "../../assets/collection/sandwhich.avif";
import idli from "../../assets/collection/idli.avif";
import thali from "../../assets/collection/thali.avif";
import chiken from "../../assets/collection/chiken.avif";
import northIndian from "../../assets/collection/northIndian.avif";
import dosa from "../../assets/collection/dosa.avif";
import noodles from "../../assets/collection/noodles.avif";
import iceCream from "../../assets/collection/icecream.avif";

const Collection = () => {
  const collections = [
    { id: "col_1", title: "Biryani", image: biryani },
    { id: "col_2", title: "Pizza", image: pizza },
    { id: "col_3", title: "Burger", image: burger },
    { id: "col_4", title: "Rolls", image: Rolls },
    { id: "col_5", title: "Chicken", image: chiken },
    { id: "col_6", title: "Thali", image: thali },
    { id: "col_7", title: "North Indian", image: northIndian },
    { id: "col_8", title: "Dosa", image: dosa },
    { id: "col_9", title: "Noodles", image: noodles },
    { id: "col_10", title: "Cake", image: cake },
    { id: "col_11", title: "Momos", image: momo },
    { id: "col_13", title: "Ice Cream", image: iceCream },
    { id: "col_14", title: "Sandwich", image: sandwhich },
    { id: "col_18", title: "Idli", image: idli },
  ];

  return (
    <div className="py-5 bg-gray-50">
      <div className="px-4 lg:px-8 max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-gray-800">
            Explore cuisines
          </h2>
          <span className="text-xs text-gray-500">Scroll for more →</span>
        </div>

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
            {collections.map((item) => (
              <motion.div
                key={item.id}
                className="flex-shrink-0 group cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-36 h-48 relative rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain brightness-95 group-hover:brightness-100 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="text-base font-medium mb-0.5">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
