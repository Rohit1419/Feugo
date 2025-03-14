import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (dish, quantity, specialInstructions) => {
    console.log("CartContext - Adding item:", dish);

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === dish.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: quantity, specialInstructions }
            : item
        );
      }
      return [...prev, { ...dish, quantity, specialInstructions }];
    });
  };

  const removeFromCart = (dishId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== dishId));
  };

  const updateQuantity = (dishId, quantity) => {
    if (quantity === 0) {
      removeFromCart(dishId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === dishId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
