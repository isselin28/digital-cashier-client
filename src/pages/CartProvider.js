import { useState, createContext } from "react";

export default function CartContextProvider({ children, context }) {
  const [cartItems, setCartItems] = useState([]);

  const getItemById = (id) => {
    console.log("id", id);
    console.log("cartItems", cartItems);
    return cartItems.find((item) => item.id === id);
  };

  const addItemToCart = (selectedItem) => {
    console.log("selectedItem", selectedItem);
    setCartItems([...cartItems, getItemById(selectedItem.id)]);
  };

  const removeItemFromCart = (removedItem) => {
    const newCart = cartItems.filter((item) => item.id !== removedItem);

    setCartItems([newCart]);
  };

  const contextValue = {
    cart: cartItems,
    addItemToCart,
    removeItemFromCart,
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
}
