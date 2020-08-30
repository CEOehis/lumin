import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import cartReducer from '../reducers/cart.reducer';

const CartContext = createContext(null);

const cartItems = localStorage.getItem('cart');
const cart = cartItems ? JSON.parse(cartItems) : [];

const setCurrency = localStorage.getItem('currency');
const currency = setCurrency || 'USD';

const initialState = {
  cart,
  showCart: false,
  currency,
};

const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  const contextValues = {
    cartState,
    dispatch,
  };

  return <CartContext.Provider value={{ ...contextValues }}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CartContext };
export default CartProvider;
