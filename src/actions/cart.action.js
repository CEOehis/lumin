/* eslint-disable import/prefer-default-export */
import { types } from '../reducers/cart.reducer';

function toggleBodyScroll(shouldLockScroll) {
  if (shouldLockScroll) {
    document.body.classList.add('noscroll');
  } else {
    document.body.classList.remove('noscroll');
  }
}

export const addToCart = (payload) => ({
  type: types.ADD_ITEM,
  payload,
});

export const removeFromCart = (payload) => ({
  type: types.REMOVE_ITEM,
  payload,
});

export const decrementQuantity = (payload) => ({
  type: types.DECREMENT_QUANTITY,
  payload,
});

export const incrementQuantity = (payload) => ({
  type: types.INCREMENT_QUANTITY,
  payload,
});

export const setDisplayCart = (payload) => {
  toggleBodyScroll(payload);
  return {
    type: types.SET_DISPLAY_CART,
    payload,
  };
};

export const setCurrency = (payload) => ({
  type: types.SET_CURRENCY,
  payload,
});

export const updateCartPrices = (payload) => ({
  type: types.UPDATE_CART_PRICES,
  payload,
});
