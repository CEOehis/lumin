import React, { createContext, useReducer } from 'react';
import cartReducer from '../reducers/cart.reducer';

const CartContext = createContext(null);

const cartItems = localStorage.getItem('cart');
const cart = cartItems ? JSON.parse(cartItems) : [];

const initialState = {
  cart,
};

const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  const contextValues = {
    cartState,
    dispatch,
  };

  return (
    <CartContext.Provider value={{ name: 'Celestine', ...contextValues }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
export default CartProvider;
