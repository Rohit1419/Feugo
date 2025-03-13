import React from "react";
import { motion } from "framer-motion";

const Collection = () => {
  const collections = [
    {
      id: "col_1",
      title: "Biryani",
      image:
        "https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png",
    },
    {
      id: "col_2",
      title: "Pizza",
      image:
        "https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png",
    },
    {
      id: "col_3",
      title: "Burger",
      image:
        "https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png",
    },
    {
      id: "col_4",
      title: "Rolls",
      image:
        "https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png",
    },
    {
      id: "col_5",
      title: "Chicken",
      image:
        "https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png",
    },
    {
      id: "col_6",
      title: "Thali",
      image:
        "https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png",
    },
    {
      id: "col_7",
      title: "North Indian",
      image:
        "https://b.zmtcdn.com/data/o2_assets/019409fe8f838312214d9211be010ef31678798444.jpeg",
    },
    {
      id: "col_8",
      title: "Dosa",
      image:
        "https://b.zmtcdn.com/data/o2_assets/8dc39742916ddc369ebeb91928391b931632716660.png",
    },
    {
      id: "col_9",
      title: "Noodles",
      image:
        "https://b.zmtcdn.com/data/dish_images/91c554bcbbab049353a8808fc970e3b31615960315.png",
    },
    {
      id: "col_10",
      title: "Cake",
      image:
        "https://b.zmtcdn.com/data/dish_images/d5ab931c8c239271de45e1c159af94311634805744.png",
    },
    {
      id: "col_11",
      title: "Momos",
      image:
        "https://b.zmtcdn.com/data/o2_assets/5dbdb72a48cf3192830232f6853735301632716604.png",
    },
    {
      id: "col_12",
      title: "Chaat",
      image:
        "https://b.zmtcdn.com/data/dish_images/1437bc204cb5c892cb22d78b4347f4651634827140.png",
    },
    {
      id: "col_13",
      title: "Ice Cream",
      image:
        "https://b.zmtcdn.com/data/o2_assets/4c7697178c268c50e1b1641fca205c231634401116.png",
    },
    {
      id: "col_14",
      title: "Sandwich",
      image:
        "https://b.zmtcdn.com/data/o2_assets/fc641efbb73b10484257f295ef0b9b981634401116.png",
    },
    {
      id: "col_15",
      title: "Paneer",
      image:
        "https://b.zmtcdn.com/data/dish_images/e44c42ff4b60b025225c8691ef9735b11635781903.png",
    },
    {
      id: "col_16",
      title: "Paratha",
      image:
        "https://b.zmtcdn.com/data/o2_assets/2b5a5b533473aada22015966f668e30e1633434990.png",
    },
    {
      id: "col_17",
      title: "Kebab",
      image:
        "https://b.zmtcdn.com/data/dish_images/742929dcb631403d7c1c1efad2ca27001634805423.png",
    },
    {
      id: "col_18",
      title: "Idli",
      image:
        "https://b.zmtcdn.com/data/dish_images/d9766dd91cd75416f4f65cf286ca84331634805483.png",
    },
    {
      id: "col_19",
      title: "Pasta",
      image:
        "https://b.zmtcdn.com/data/dish_images/c953e5ca07150e9a51f8b21102e20f7e1634805157.png",
    },
    {
      id: "col_20",
      title: "Shawarma",
      image:
        "https://b.zmtcdn.com/data/o2_assets/2f34540e0b12058f5f8b9390c3a3fb4a1648972281.png",
    },
  ];

  return (
    <div className="px-4 lg:max-w-7xl lg:mx-auto py-6">
      <h2 className="text-lg lg:text-xl font-bold text-brand-dark mb-4">
        Explore Collections
      </h2>

      <div className="flex gap-3 overflow-x-auto pb-4  ">
        {collections.map((collection) => (
          <motion.div
            key={collection.id}
            className="relative flex-shrink-0 w-14 h-14 lg:w-28 lg:h-28 rounded-xl overflow-hidden cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={collection.image}
              alt={collection.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
            <div className="absolute inset-x-0 bottom-0 p-2 text-center">
              <h3 className="text-xs lg:text-sm font-medium text-white">
                {collection.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
