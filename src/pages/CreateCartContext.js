import { createContext } from "react";

export default function CreateCartContext() {
  const defaultContext = {
    cart: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
  };

  return createContext(defaultContext);
}
