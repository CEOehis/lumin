import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import cartReducer from '../reducers/cart.reducer';

const cartItems = localStorage.getItem('cart');
const cart = cartItems ? JSON.parse(cartItems) : [];

const setCurrency = localStorage.getItem('currency');
const currency = setCurrency || 'USD';

const initialState = {
  cart,
  showCart: false,
  currency,
};

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

function useCartState() {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCartState must be used within a CartProvider');
  }

  return context;
}

function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }

  return context;
}

function useCart() {
  return [useCartState(), useCartDispatch()];
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CartProvider, useCartState, useCartDispatch, useCart };
