import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroImage from "../../assets/heroImage.jpg";
import heroImage1 from "../../assets/heroImage1.avif";
import heroImage2 from "../../assets/heroImage2.jpeg";
import frist50 from "../../assets/Feugo Images/coupens/frist50.png";
import items49 from "../../assets/Feugo Images/coupens/items49.png";
import holi20 from "../../assets/Feugo Images/coupens/Holi20.png";
import items99 from "../../assets/Feugo Images/coupens/items99.png";

const Hero = () => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const bannerImages = [heroImage, heroImage1, heroImage2];

  const offers = [
    { id: 1, image: frist50 },
    { id: 2, image: holi20 },
    { id: 3, image: items49 },
    { id: 4, image: items99 },
  ];

  React.useEffect(() => {
    bannerImages.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 100000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative">
      {/* Hero Banner */}
      <div className="relative h-[60vh] md:h-[70vh] lg:h-[60vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <img
              src={bannerImages[currentImage]}
              alt="Hero Banner"
              className="w-full h-full object-cover transform scale-105"
              style={{ willChange: "transform" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 md:px-8 max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-5xl lg:text-4xl font-bold text-white mb-6 align-bottom "
            >
              Order from your favorite restaurants with exclusive offers
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Offers Section */}
      <div className="relative -mt-2 px-2 md:px-2 lg:px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-xl p-2 md:p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {offers.map((offer) => (
              <motion.div
                key={offer.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <img
                  src={offer.image}
                  alt={`Offer ${offer.id}`}
                  className="w-full h-32 md:h-40 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
