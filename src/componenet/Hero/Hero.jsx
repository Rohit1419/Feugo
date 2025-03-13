import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const bannerImages = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop",
  ];

  const offers = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947",
      title: "50% OFF on first order",
      code: "FIRST50",
      description: "Valid on all restaurants",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae",
      title: "Free delivery above ₹199",
      code: "FREEDEL",
      description: "Limited time offer",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      title: "20% OFF on orders above ₹499",
      code: "SAVE20",
      description: "All payment methods accepted",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
      title: "Special Weekend Offer",
      code: "WEEKEND",
      description: "Only for weekend orders",
    },
  ];

  const [currentImage, setCurrentImage] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="relative h-[50vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${bannerImages[currentImage]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-food-yellow-900/10 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced Offers Section */}
      <div className="px-4 py-6 lg:max-w-7xl lg:mx-auto bg-food-yellow-50">
        <h2 className="text-lg lg:text-xl font-bold text-brand-dark mb-4">
          Best Offers for You
        </h2>
        <motion.div
          className="flex gap-4 overflow-x-auto lg:grid lg:grid-cols-4 pb-4 scrollbar-hide"
          whileTap={{ cursor: "grabbing" }}
        >
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              className="flex-shrink-0 w-72 lg:w-full h-32 relative rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-food-yellow-900/80 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white font-semibold">{offer.title}</h3>
                <p className="text-food-yellow-100 text-sm mb-1">
                  {offer.description}
                </p>
                <span className="inline-block px-2 py-1 bg-white/20 rounded text-yellow-200 text-sm">
                  Use code: {offer.code}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
