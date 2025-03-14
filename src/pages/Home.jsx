import React from "react";
import Hero from "../componenet/Hero/Hero";
import Collection from "../componenet/Collection/Collection";
import DishSuggestion from "../componenet/DishSuggestion/DishSuggestion";
import NearbyRestaurant from "../componenet/NearbyRestaruent/NearbyRestaruent";
import BottomNav from "../componenet/BottomNav/BottomNav";

const Home = () => {
  return (
    <>
      <Hero />
      <Collection />
      <DishSuggestion />
      <NearbyRestaurant />
      <BottomNav />
    </>
  );
};

export default Home;
