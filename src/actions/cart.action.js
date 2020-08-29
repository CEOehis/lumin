/* eslint-disable import/prefer-default-export */
import { types } from '../reducers/cart.reducer';

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
